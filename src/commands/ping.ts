import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Replies with pong", // Required for slash commands
  hidden: true,
  slash: "both", // Create both a slash and legacy command
  testOnly: true, // Only register a slash command for the testing guilds

  callback: ({ message, interaction }) => {
    const reply = "Pong!";

    // The message property will be undefined if the command is ran
    // as a slash command. It is encouraged to check if 'message' or
    // 'interaction' exists before interacting with them.
    if (message) {
      message.reply({
        content: reply,
      });
    }

    // The interaction property will be undefined if the command is
    // ran as a legacy command. It is encouraged to check if 'message' or
    // 'interaction' exists before interacting with them.
    if (interaction) {
      interaction.reply({
        content: reply,
      });
    }
  },
} as ICommand;
