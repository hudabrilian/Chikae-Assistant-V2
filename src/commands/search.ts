import { QueryType } from "discord-player";
import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Search music.",
  hidden: false,
  slash: false,
  expectedArgs: "<name>",

  callback: async ({ client, message, channel, args }) => {
    if (!args[0]) return `Please enter a valid search ${message.author}...`;

    const res = await player.search(args.join(" "), {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return `No results found ${message.author}...`;

    const queue = player.createQueue(message!.guild!, {
      metadata: message.channel,
    });

    const embed = new MessageEmbed();

    embed.setAuthor({
      name: `Results for ${args.join(" ")}`,
      iconURL: client!.user!.displayAvatarURL({ size: 1024, dynamic: true }),
    });

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(
      `${maxTracks
        .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
        .join("\n")}\n\nType choice between **1** and **${
        maxTracks.length
      }** or **cancel** `
    );

    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });

    const collector = message.channel.createMessageCollector({
      filter: (m: Message) => m.author.id === message.author.id,
      time: 10000,
    });

    let error: boolean = true;

    collector.on("collect", async (m) => {
      if (m.content.toLowerCase() === "cancel") {
        message.channel.send(`Search cancelled ✅`);
        error = false;
        collector.stop();
        return;
      }

      const value = Number(m.content);

      if (!value || value <= 0 || value > maxTracks.length) {
        message.channel.send(
          `Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**...`
        );
        return;
      }

      error = false;
      collector.stop();

      try {
        if (!queue.connection)
          await queue.connect(message!.member!.voice!.channel!);
      } catch {
        player.deleteQueue(message!.guild!.id);
        message.channel.send(
          `I can't join the voice channel ${message.author}...`
        );
        return;
      }

      await message.channel.send(`Loading your search... 🎧`);

      queue.addTrack(res.tracks[Number(m.content) - 1]);

      if (!queue.playing) await queue.play();
    });

    collector.on("end", (m) => {
      if (error === true)
        message.channel.send(`Search timed out ${message.author}...`);
      return;
    });
  },
} as ICommand;
