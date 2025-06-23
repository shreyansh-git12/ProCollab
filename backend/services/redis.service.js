import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL, {
  tls: {}, // 👈 enables TLS, required for Upstash
});

console.log("REDIS_URL:", process.env.REDIS_URL);

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
redisClient.on("connect", () => console.log("✅ Redis Client Connected"));

export default redisClient;
