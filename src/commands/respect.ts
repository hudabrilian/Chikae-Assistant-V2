import DJS, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Fun",
  description: "Respect for another people or yourself.",
  aliases: ["f"],
  hidden: false,
  maxArgs: 1,
  expectedArgs: "[user]",
  slash: false,

  callback: ({ message, args }) => {
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${message.author.username} has paid their respects.`,
          iconURL: message.author.displayAvatarURL({ format: "png" }),
        })
        .setColor("AQUA")
        .setFooter({ text: `Press F to pay your respects.` });
      message.channel.send({ embeds: [embed] }).then((m) => m.react("🇫"));
    } else {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${message.author.username} has paid their respects.`,
          iconURL: message.author.displayAvatarURL({ format: "png" }),
        })
        .setColor("AQUA")
        .setDescription(`to ${args[0]}`)
        .setFooter({ text: `Press F to pay your respects.` });
      message.channel.send({ embeds: [embed] }).then((m) => m.react("🇫"));
    }
  },
} as ICommand;
