import levelSchema from "../models/level-schema";

export default class discordXp {
  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   */

  static async createUser(userId: string, guildId: string) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");

    const isUser = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (isUser) return false;

    const newUser = new levelSchema({
      userID: userId,
      guildID: guildId,
    });

    await newUser
      .save()
      .catch((e: Error) => console.log(`Failed to create user: ${e}`));

    return newUser;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   */

  static async deleteUser(userId: string, guildId: string) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    await levelSchema
      .findOneAndDelete({ userID: userId, guildID: guildId })
      .catch((e: Error) => console.log(`Failed to delete user: ${e}`));

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [xp] - Amount of xp to append.
   */

  static async appendXp(userId: string, guildId: string, xp: number) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (xp !== 0 && !xp)
      throw new TypeError("An amount of xp was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });

    if (!user) {
      const newUser = new levelSchema({
        userID: userId,
        guildID: guildId,
        xp: xp,
        level: Math.floor(0.1 * Math.sqrt(xp)),
      });

      await newUser.save().catch((e: Error) => console.log(e));

      return Math.floor(0.1 * Math.sqrt(xp)) > 0;
    }

    user.xp += Number(xp);
    user.level = Math.floor(0.1 * Math.sqrt(user.xp));

    await user
      .save()
      .catch((e: Error) => console.log(`Failed to append xp: ${e}`));

    return Math.floor(0.1 * Math.sqrt((user.xp -= xp))) < user.level;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {string} [levels] - Amount of levels to append.
   */

  static async appendLevel(userId: string, guildId: string, levelss: string) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!levelss) throw new TypeError("An amount of levels was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.level += Number(levelss);
    user.xp = user.level * user.level * 100;

    user
      .save()
      .catch((e: Error) => console.log(`Failed to append level: ${e}`));

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [xp] - Amount of xp to set.
   */

  static async setXp(userId: string, guildId: string, xp: number) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (xp !== 0 && !xp)
      throw new TypeError("An amount of xp was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.xp = xp;
    user.level = Math.floor(0.1 * Math.sqrt(user.xp));

    user.save().catch((e: Error) => console.log(`Failed to set xp: ${e}`));

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [level] - A level to set.
   */

  static async setLevel(userId: string, guildId: string, level: number) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!level) throw new TypeError("A level was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.level = level;
    user.xp = level * level * 100;

    user.save().catch((e: Error) => console.log(`Failed to set level: ${e}`));

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   */

  static async fetch(
    userId: string,
    guildId: string,
    fetchPosition: boolean = false
  ) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    if (fetchPosition === true) {
      const leaderboard = await levelSchema
        .find({
          guildID: guildId,
        })
        .sort([["xp", "descending"]])
        .exec();

      user.position = leaderboard.findIndex((i) => i.userID === userId) + 1;
    }

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [xp] - Amount of xp to subtract.
   */

  static async subtractXp(userId: string, guildId: string, xp: number) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (xp !== 0 && !xp)
      throw new TypeError("An amount of xp was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.xp -= xp;
    user.level = Math.floor(0.1 * Math.sqrt(user.xp));

    user.save().catch((e: Error) => console.log(`Failed to subtract xp: ${e}`));

    return user;
  }

  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   * @param {number} [levels] - Amount of levels to subtract.
   */

  static async subtractLevel(userId: string, guildId: string, levelss: number) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!levelss) throw new TypeError("An amount of levels was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.level -= levelss;
    user.xp = user.level * user.level * 100;

    user
      .save()
      .catch((e: Error) => console.log(`Failed to subtract levels: ${e}`));

    return user;
  }

  /**
   * @param {number} [targetLevel] - Xp required to reach that level.
   **/
  static xpFor(targetLevel: number) {
    if (isNaN(targetLevel) || isNaN(Number(targetLevel))) return;
    if (isNaN(targetLevel)) targetLevel = Number(targetLevel);
    if (targetLevel < 0)
      throw new RangeError("Target level should be a positive number.");
    return targetLevel * targetLevel * 100;
  }
}
