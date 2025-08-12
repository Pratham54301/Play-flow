import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "change-me",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  dataDir: process.env.DATA_DIR || path.join(__dirname, "../data"),
};

if (!config.mongoUri) {
  console.warn("[config] MONGO_URI is not set. Set it in .env to enable database connection.");
}
if (!process.env.JWT_SECRET) {
  console.warn("[config] JWT_SECRET is not set. Using a fallback value; do not use in production.");
}