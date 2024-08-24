import asyncHandlder from "express-async-handler";
import Helpers from "../../helpers/featureHelp.js";
import Project from "../../models/projectModel.js";

export const createProject = asyncHandlder(async (req, res) => {
  const { name } = req.body;
  const helpers = new Helpers();
  if (!name) {
    return helpers.sendMessage(res, 204, "No Content");
  }

  let existingProject = await Project.findOne({ name });
  if (existingProject) {
    return helpers.sendMessage(res, 409, "Project already exists");
  }

  const newProject = await Project.create({
    name,
  });

  if (!newProject) {
    return helpers.sendMessage(res, 500, "Failed to create the project");
  } else {
    helpers.sendMessage(res, 201, "Your project is successfully created");
  }
});

export const getProject = asyncHandlder(async (req, res) => {
  const helpers = new Helpers();

  const projects = await Project.find().sort({ createdAt: -1 });

  if (!projects) {
    return helpers.sendMessage(res, 404, "No data found");
  }

  helpers.sendMessage(res, 200, "Success", projects);
});
