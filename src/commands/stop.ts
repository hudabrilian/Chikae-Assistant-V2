import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Stop music.",
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    queue.destroy();

    return `Music stopped into this server, see you next time ✅`;
  },
} as ICommand;
