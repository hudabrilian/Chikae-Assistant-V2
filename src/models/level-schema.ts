import mongoose, { Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const levelSchema = new Schema({
  guildID: reqString,
  userID: reqString,
  xp: reqNumber,
  level: {
    type: Number,
    required: true,
    default: 0,
  },
});

const name = "level";
export default mongoose.models[name] || mongoose.model(name, levelSchema, name);
