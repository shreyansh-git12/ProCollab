import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import geminiRoute from "./routes/geminiRoute.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize database connection
connect();

// Initialize express app
const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from 'build' directory

// Define routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/api/gemini", geminiRoute);

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
