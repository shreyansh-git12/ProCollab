import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    // Log the incoming token for debugging
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    console.log("Received token:", token); // Log received token for debugging

    if (!token) {
      return res.status(401).json({ message: "Token is not provided" });
    }

    // Check if the token is blacklisted and log the result
    const isBlacklisted = await redisClient.get(token);
    console.log("Is token blacklisted?", isBlacklisted); // Log blacklist check

    if (isBlacklisted) {
      res.cookie("token", "");
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    // Attempt to decode the token and log the process
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log decoded token for debugging

    req.user = decoded;

    // Log user info before proceeding to next middleware
    console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    // Log any errors that occur during verification
    console.error("Error during token verification:", error.message); // Log error for debugging
    res.status(401).json({ message: "Invalid token" });
  }
};
