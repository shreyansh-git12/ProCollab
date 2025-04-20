import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("User id is required");
  }

  try {
    const project = await projectModel.create({
      name,
      users: [userId],
    });
    return project;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw err;
  }
};

export const getAllProjects = async ({ userId }) => {
  if (!userId) {
    throw new Error("User id is required");
  }

  try {
    const getAllProjects = await projectModel.find({ users: userId });
    return getAllProjects;
  } catch (err) {
    throw err;
  }
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid or missing project ID");
  }

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("Users must be a non-empty array");
  }
  if (!userId) {
    throw new Error("User id is required");
  }

  const areAllValid = users.every((id) => mongoose.Types.ObjectId.isValid(id));
  if (!areAllValid) {
    throw new Error("One or more user IDs are invalid");
  }

  try {
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });

    if (!project) {
      throw new Error("Project not found or user not authorized");
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      projectId,
      {
        $addToSet: { users: { $each: users } },
      },
      { new: true }
    );

    return updatedProject;
  } catch (err) {
    throw err;
  }
};

export const getProjectById = async (projectId) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid or missing project ID");
  }

  try {
    const project = await projectModel.findById(projectId).populate("users");

    return project;
  } catch (err) {
    throw err;
  }
};
