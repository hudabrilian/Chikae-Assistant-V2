import {
  ButtonInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { ICommand } from "wokcommands";
import { player } from "../index";

export default {
  category: "Music",
  description: "Now Playing music.",
  aliases: ["np"],
  hidden: false,
  slash: false,

  callback: async ({ client, message, channel }) => {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing)
      return `No music currently playing ${message.author}... try again ? ❌`;

    const track = queue.current;

    const progress = queue.createProgressBar();

    const embed = new MessageEmbed();

    embed.setThumbnail(track.thumbnail);
    embed.setAuthor({
      name: track.title,
      iconURL: client!.user!.displayAvatarURL({ size: 1024, dynamic: true }),
    });

    const methods = ["disabled", "track", "queue"];

    embed.setDescription(
      `${progress}\n\nVolume **${queue.volume}**%\nDuration **${
        track.duration
      }**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${
        track.requestedBy
      }`
    );

    embed.setTimestamp();

    // const saveButton = new MessageButton()
    //   .setCustomId("save_track")
    //   .setLabel("Save this track")
    //   .setEmoji("➕")
    //   .setCustomId("saveTrack")
    //   .setStyle("SUCCESS");

    // const row = new MessageActionRow().addComponents(saveButton);

    // await message.channel.send({ embeds: [embed], components: [row] });
    message.channel.send({ embeds: [embed] });

    // const collector = message.createMessageComponentCollector({
    //   max: 2,
    //   time: 1000 * 10,
    //   componentType: "BUTTON",
    // });

    // collector.on("collect", (i) => {
    //   if (i.user.id === message.author.id) {
    //     i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
    //   } else {
    //     i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    //   }
    // });

    // collector.on("end", async (collector) => {
    //   console.log(`Collected ${collector.size} interactions.`);
    // });
  },
} as ICommand;
