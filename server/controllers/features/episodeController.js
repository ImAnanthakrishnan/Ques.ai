import asynchandler from "express-async-handler";
import Helpers from "../../helpers/featureHelp.js";
import Project from "../../models/projectModel.js";
import Episode from "../../models/episodesModel.js";

export const createEpisode = asynchandler(async (req, res) => {
  const { projectName } = req.params;
  const { name, transcript } = req.body;
  const helpers = new Helpers();
  if (!projectName || !name || !transcript) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  const existingProject = await Project.findOne({ name: projectName });

  if (!existingProject) {
    return helpers.sendMessage(res, 404, "Project Not found");
  }

  const newEpisode = await Episode.create({
    name,
    transcript,
  });

  if (!newEpisode) {
    return helpers.sendMessage(res, 500, "Failed to create the episode");
  } else {
    existingProject.episodes.push(newEpisode._id);
    await existingProject.save();
    helpers.sendMessage(res, 201, "Your episode is successfully created");
  }
});

export const getEpisode = asynchandler(async (req, res) => {
  const { projectName } = req.params;

  const helpers = new Helpers();

  if (!projectName) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  const episodes = await Project.aggregate([
    {
      $match: { name: projectName },
    },
    {
      $unwind: "$episodes",
    },
    {
      $lookup: {
        from: "episodes",
        localField: "episodes",
        foreignField: "_id",
        as: "episodeDetails",
      },
    },
    {
      $unwind: "$episodeDetails",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        episodes: { $push: "$episodeDetails" },
      },
    },
  ]);

  const data = episodes;

  if (!episodes) {
    return helpers.sendMessage(res, 404, "No data found");
  }

  helpers.sendMessage(res, 200, "Success", data);
});

export const editEpisode = asynchandler(async (req, res) => {
  const { projectName } = req.params;
  const { transcript, id } = req.body;
  const helpers = new Helpers(); 
 
  if (!transcript || !id) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  const existingEpisode = await Episode.findById(id);

  if (!existingEpisode) {
    return helpers.sendMessage(res, 404, "No data found");
  }

  existingEpisode.transcript = transcript;
  try {
    const updatedEpisode = await existingEpisode.save();
    helpers.sendMessage(res, 200, "Success", updatedEpisode);
  } catch (error) {
    return helpers.sendMessage(res, 500, "Failed to update");
  }
});

export const deleteEpisode = asynchandler(async(req,res) => {
 
  const {projectName : id} = req.params;

  const helpers = new Helpers();

  if (!id) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  const existingEpisode = await Episode.findById(id);

  if (!existingEpisode) {
    return helpers.sendMessage(res, 404, "No data found");
  }

  try {
    const deleteEpisode = await Episode.deleteOne({_id:id});
    helpers.sendMessage(res, 200, "Successfully deleted");
  } catch (error) {
    return helpers.sendMessage(res, 500, "Failed to delete");
  }

})