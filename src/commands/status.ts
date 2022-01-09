import { ICommand } from "wokcommands";

export default {
  category: "Configuration",
  description: "Sets the bots status",
  hidden: true,
  minArgs: 1,
  expectedArgs: "<status>",

  slash: "both",
  testOnly: true,
  ownerOnly: true,

  callback: ({ client, text }) => {
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: text,
          type: "WATCHING",
        },
      ],
    });

    return "Status updated";
  },
} as ICommand;
