import mongoose from "mongoose";

function connect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected..."))
    .catch((error) => console.error("❌ MongoDB connection error:", error));
}

export default connect;
