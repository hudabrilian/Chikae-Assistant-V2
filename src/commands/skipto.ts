import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Skip to number music.",
  aliases: ["st"],
  hidden: false,
  minArgs: 1,
  expectedArgs: "<number>",
  slash: false,

  callback: async ({ message, args }) => {
    if (!args[0]) return `Please enter a valid number ${message.author}...`;

    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    const reqNumber = Number(args[0]) - 1;

    const loadingMessage = await message.channel.send(
      `Skipping to track number ${reqNumber + 1}... 🎧`
    );

    try {
      queue.skipTo(Number(reqNumber));
    } catch {
      message.channel.send(
        `No music available for ${reqNumber + 1} in the queue.`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingMessage.delete();
  },
} as ICommand;
