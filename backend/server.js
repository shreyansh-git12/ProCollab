import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import geminiRoute from "./routes/geminiRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

console.log("🔧 REDIS_URL from .env:", process.env.REDIS_URL);

connect();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/api/gemini", geminiRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
