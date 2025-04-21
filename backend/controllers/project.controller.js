import projectModel from "../models/project.model.js";
import {
  addUsersToProject,
  createProject,
  getAllProjects,
  getProjectById,
} from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const loggedInUser = await userModel.findOne(req.user._id);

    const userId = loggedInUser._id;

    const newProject = await createProject({ name, userId });

    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    // Debugging: Log the incoming request to verify that user is being passed correctly
    console.log("Request received to fetch projects for user:", req.user);

    // Step 1: Check if user is being retrieved correctly by email
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    // Debugging: Log the result of the user lookup
    if (!loggedInUser) {
      console.error("User not found with email:", req.user.email);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Logged in user details:", loggedInUser);

    // Step 2: Fetch the projects associated with the logged-in user
    const getUserProjects = await getAllProjects({
      userId: loggedInUser._id,
    });

    // Debugging: Log the projects fetched
    console.log("Fetched projects for user:", getUserProjects);

    // Step 3: Return the response with the projects
    return res.status(200).json({
      projects: getUserProjects,
      message: "Projects fetched successfully",
    });
  } catch (error) {
    // Extensive debugging for any unexpected errors
    console.error("Error while fetching projects:", error);
    return res.status(400).json({ message: error.message });
  }
};

export const addUserToProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId, users } = req.body;

    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const project = await addUsersToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res
      .status(200)
      .json({ project, message: "Users added successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProjectByIdController = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
