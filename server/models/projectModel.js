import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'episode'
      }
    ]
  }, { timestamps: true });

const Project = mongoose.model("project",ProjectSchema);
export default Project;

