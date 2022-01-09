import DJS from "discord.js";
import { ICommand } from "wokcommands";
import Levels from "../functions/level";

export default {
  category: "Information",
  description: "Information about your / someone level", // Required for slash commands
  hidden: false,
  slash: "both", // Create both a slash and legacy command
  testOnly: false, // Only register a slash command for the testing guilds
  maxArgs: 1,
  expectedArgs: "[user]",
  options: [
    {
      name: "user",
      description: "The target user.",
      required: false,
      type: DJS.Constants.ApplicationCommandOptionTypes.USER,
    },
  ],

  callback: async ({ message, interaction }) => {
    const target = message
      ? message.mentions.users.first() || message.author
      : interaction.options.getUser("user") || interaction.user;

    const user = await Levels.fetch(
      target.id,
      message?.guild!.id || interaction?.guild!.id
    );
    let reply: string;

    if (!user) {
      reply = `Seems like <@${target.id}> has not earned any xp so far.`;
    } else {
      reply = `> **${target.tag}** is currently level ${user.level}.`;
    }

    if (message) {
      message.channel.send({
        content: reply,
      });
    }

    if (interaction) {
      interaction.reply({
        content: reply,
      });
    }
  },
} as ICommand;
