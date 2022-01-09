import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Resume music.",
  aliases: ["rs"],
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue)
      return message.channel.send(
        `No music currently playing ${message.author}...`
      );

    const success = queue.setPaused(false);

    return success
      ? `Current music ${queue.current.title} resumed ✅`
      : `Something went wrong ${message.author}...`;
  },
} as ICommand;
