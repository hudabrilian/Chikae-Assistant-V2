import { QueueRepeatMode } from "discord-player";
import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Loop music.",
  hidden: false,
  slash: false,
  expectedArgs: "[queue]",

  callback: async ({ message, args, prefix }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    if (args.join("").toLowerCase() === "queue") {
      if (queue.repeatMode === 1)
        return `You must first disable the current music in the loop mode (${prefix}loop) ${message.author}...`;

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF
      );

      return success
        ? `Repeat mode **${
            queue.repeatMode === 0 ? "disabled" : "enabled"
          }** the whole queue will be repeated endlessly 🔁`
        : `Something went wrong ${message.author}...`;
    } else {
      if (queue.repeatMode === 2)
        return `You must first disable the current queue in the loop mode (${prefix}loop queue) ${message.author}...`;

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF
      );

      return success
        ? `Repeat mode **${
            queue.repeatMode === 0 ? "disabled" : "enabled"
          }** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂`
        : `Something went wrong ${message.author}...`;
    }
  },
} as ICommand;
