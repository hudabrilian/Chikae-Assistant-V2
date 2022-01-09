import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Queue music.",
  aliases: ["q"],
  hidden: false,
  slash: false,

  callback: async ({ client, message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue) return `No music currently playing ${message.author}...`;

    if (!queue.tracks[0])
      return `No music in the queue after the current one ${message.author}...`;

    const embed = new MessageEmbed();
    const methods = ["", "🔁", "🔂"];

    embed.setColor("AQUA");
    embed.setThumbnail(
      message!.guild!.iconURL({ format: "png", size: 2048, dynamic: true }) ||
        ""
    );
    embed.setAuthor({
      name: `Server queue - ${message!.guild!.name} ${
        methods[queue.repeatMode]
      }`,
      iconURL: client!.user!.displayAvatarURL({ size: 1024, dynamic: true }),
    });

    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
          track.requestedBy.username
        })`
    );

    const songs = queue.tracks.length;
    const nextSongs =
      songs > 5
        ? `And **${songs - 5}** other song(s)...`
        : `In the playlist **${songs}** song(s)...`;

    embed.setDescription(
      `Current ${queue.current.title}\n\n${tracks
        .slice(0, 5)
        .join("\n")}\n\n${nextSongs}`
    );

    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
} as ICommand;
