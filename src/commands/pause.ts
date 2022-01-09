import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Pause music.",
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue)
      return message.channel.send(
        `No music currently playing ${message.author}...`
      );

    const success = queue.setPaused(true);

    return success
      ? `Current music ${queue.current.title} paused ✅`
      : `Something went wrong ${message.author}...`;
  },
} as ICommand;
