import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import geminiRoute from "./routes/geminiRoute.js";
import cookieParser from "cookie-parser";
import path from "path";

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
const __dirname = path.resolve();
try {
  app.use(express.static(path.join(__dirname, "build")));
  console.log("✅ Static files middleware loaded.");
} catch (err) {
  console.error("❌ Error setting static files path:", err);
}

// Define routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/api/gemini", geminiRoute);

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Fallback route for all other requests (for SPA)
app.get("/:catchAll(*)", (req, res) => {
  console.log(`🌐 Unknown route hit: ${req.originalUrl} — serving index.html`);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
