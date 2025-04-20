import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = new userModel({ email, password });
  await user.save();
  return user;
};

const getAllUsers = async ({ userId }) => {
  const users = await userModel
    .find({
      _id: { $ne: userId },
    })
    .select("-password");
  return users;
};

export default {
  createUser,
  getAllUsers,
};
