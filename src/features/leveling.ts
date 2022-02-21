import { Client, MessageEmbed } from "discord.js";
import WOKCommands from "wokcommands";
import Levels from "../functions/level";

export default (client: Client, instance: WOKCommands) => {
  client.on("messageCreate", async (message) => {
    return;
    if (
      message.content
        .toLowerCase()
        .startsWith(instance.getPrefix(message.guild)) ||
      message.author.bot ||
      !message.guild
    )
      return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(
      message!.author!.id,
      message!.guild!.id,
      randomAmountOfXp
    );

    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);

      const levelEmbed = new MessageEmbed()
        .setTitle("New Level!")
        .setColor("BLUE")
        .setDescription(
          `**GG** ${message.author}, you just leveled up to level **${user.level}**!`
        );

      const sendEmbed = await message.channel.send({
        embeds: [levelEmbed],
      });
      sendEmbed.react("🥳");
    }
  });
};

const config = {
  displayName: "Leveling",
  dbName: "LEVEL",
};

export { config };
