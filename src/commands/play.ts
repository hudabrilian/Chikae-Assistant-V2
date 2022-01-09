import { QueryType } from "discord-player";
import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Play music.",
  aliases: ["p"],
  hidden: false,
  minArgs: 1,
  expectedArgs: "<song>",
  slash: false,

  callback: async ({ message, args }) => {
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

    try {
      if (!queue.connection)
        await queue.connect(message!.member!.voice!.channel!);
    } catch {
      player.deleteQueue(message!.guild!);
      return `I can't join the voice channel ${message.author}...`;
    }

    const loadingMessage = await message.channel.send(
      `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`
    );

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
    if (!queue.playing) await queue.play();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingMessage.delete();
  },
} as ICommand;
