import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  musicName: { type: String },
  author: { type: String },
  musicSource: { type: String },
  musicImage: { type: String },
  type: {type: String},
  createdAt: { type: String },
});

const Music = mongoose.model("musics", musicSchema);

export default Music;
