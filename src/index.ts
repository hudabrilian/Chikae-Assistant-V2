import DiscordJS, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import { Player } from "discord-player";
import "dotenv/config";

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    filter: "audioonly",
  },
});

const PREFIX: string = process.env.BOT_PREFIX || "c.";
const TEST_SERVER: string = process.env.TEST_SERVER || "";
const BOT_OWNER: string = process.env.BOT_OWNER || "";

client.on("ready", () => {
  client.user?.setActivity(`Your input! :)`, {
    type: "WATCHING",
  });

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    // typeScript: true,
    dbOptions: {
      keepAlive: true,
    },
    testServers: TEST_SERVER,
    botOwners: BOT_OWNER,
    mongoUri: process.env.MONGO_URI,
    disabledDefaultCommands: [
      // 'help',
      "command",
      "language",
      // 'prefix',
      "requiredrole",
    ],
  })
    .setDefaultPrefix(PREFIX)
    .setColor(0xff0000)
    .setCategorySettings([
      {
        name: "Music",
        emoji: "🎵",
      },
      {
        name: "Fun",
        emoji: "✌️",
      },
      {
        name: "Moderation",
        emoji: "🚧",
      },
      {
        name: "Information",
        emoji: "ℹ️",
      },
    ]);
});

import "./events/player";

client.login(process.env.BOT_TOKEN);
