import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Episode = mongoose.model("episode", EpisodeSchema);
export default Episode;
