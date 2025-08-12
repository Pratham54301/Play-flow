import mongoose from "mongoose";
import { config } from "./env.js";

export async function connectDB() {
  if (!config.mongoUri) {
    console.warn("[db] Skipping DB connection; MONGO_URI not provided.");
    return;
  }
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.mongoUri);
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.error("[db] MongoDB connection error:", err);
    process.exit(1);
  }
}