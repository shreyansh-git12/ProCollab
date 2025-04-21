import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import { generateTextService } from "./services/geminiService.js";
import app from "./app.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

console.log("🚀 Starting server setup...");

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

console.log("✅ Socket.IO server initialized.");

const secretKey = process.env.JWT_SECRET || "your-secret-key";
console.log("🔐 JWT Secret Key Loaded:", secretKey ? "Yes" : "No");

io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];
    const projectId = socket.handshake.query.projectId;

    console.log(
      "🔍 Incoming Socket Connection — Token:",
      token,
      "ProjectId:",
      projectId
    );

    if (!token) return next(new Error("Authentication token is missing"));
    const decoded = jwt.verify(token, secretKey);
    if (!decoded?.id) return next(new Error("Invalid authentication token"));
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId))
      return next(new Error("Invalid or missing projectId"));

    const project = await projectModel.findOne({
      _id: projectId,
      users: decoded.id,
    });
    if (!project)
      return next(new Error("User not authorized for this project"));

    socket.projectId = projectId;
    socket.user = decoded;
    console.log("✅ Socket authenticated:", socket.user);
    next();
  } catch (err) {
    console.error("❌ Socket authentication error:", err.message);
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(`🟢 New client connected to project ${socket.projectId}`);
  socket.join(socket.projectId);

  socket.on("project-message", async (data) => {
    console.log("📨 Message received:", data);

    const message = data.message;
    const aiIsPresentInMessage = message.includes("@ai");

    if (aiIsPresentInMessage) {
      const prompt = message.replace("@ai", "").trim();
      console.log("💡 AI trigger detected, Prompt:", prompt);

      try {
        const result = await generateTextService(prompt);
        const aiMessage = { message: result, email: "@ai" };
        io.to(socket.projectId).emit("project-message", aiMessage);
        console.log("✅ AI response sent.");
      } catch (error) {
        console.error("❌ AI generation failed:", error);
      }

      return;
    }

    socket.broadcast.to(socket.projectId).emit("project-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected from project ${socket.projectId}`);
  });
});

server.listen(port, () => {
  console.log(`✅ Server is live and listening on port ${port}`);
});
