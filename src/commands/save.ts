import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Save music.",
  hidden: false,
  slash: false,

  callback: async ({ message }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}...`;

    await message.author
      .send(
        `You saved the track ${queue.current.title} | ${
          queue.current.author
        } from the server ${message!.guild!.name} ✅`
      )
      .catch((error) => {
        return `Unable to send you a private message ${message.author}...`;
      });

    return `I have sent you the title of the music by private messages ✅`;
  },
} as ICommand;
