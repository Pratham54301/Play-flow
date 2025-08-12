import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";
import { config } from "./env.js";

const uploadsDir = path.join(config.dataDir, "uploads");

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

await ensureDir(uploadsDir);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname || "");
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

export const upload = multer({ storage });
export const UPLOADS_DIR = uploadsDir;