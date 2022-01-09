import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Shuffle music.",
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    if (!queue.tracks[0])
      return `No music in the queue after the current one ${message.author}...`;

    queue.shuffle();

    return `Queue shuffled **${queue.tracks.length}** song(s) ! ✅`;
  },
} as ICommand;
