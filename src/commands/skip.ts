import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Skip music.",
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    const success = queue.skip();

    return success
      ? `Current music ${queue.current.title} skipped ✅`
      : `Something went wrong ${message.author}...`;
  },
} as ICommand;
