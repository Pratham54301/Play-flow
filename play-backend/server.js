import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { requestLogger } from "./utils/logger.js";

import authRoutes from "./routes/auth.js";
import registrationRoutes from "./routes/registration.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import healthRoutes from "./routes/health.js";
import { UPLOADS_DIR } from "./config/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

const app = express();

app.use(requestLogger);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.corsOrigin === "*" ? true : config.corsOrigin,
    credentials: true,
  })
);

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOADS_DIR));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(config.port, () => {
  console.log(`play-backend listening on http://localhost:${config.port}`);
});