import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Volume music.",
  hidden: false,
  slash: false,
  expectedArgs: "<number>",

  callback: async ({ message, args }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    const vol = parseInt(args[0]);

    if (!vol)
      return `The current volume is ${
        queue.volume
      } 🔊\n*To change the volume enter a valid number between **1** and **${100}**.*`;

    if (queue.volume === vol)
      return `The volume you want to change is already the current one ${message.author}...`;

    if (vol < 0 || vol > 100)
      return `The specified number is not valid. Enter a number between **1** and **${100}** ${
        message.author
      }...`;

    const success = queue.setVolume(vol);

    return success
      ? `The volume has been modified to **${vol}**/**${100}**% 🔊`
      : `Something went wrong ${message.author}...`;
  },
} as ICommand;
