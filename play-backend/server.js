import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin,
    credentials: true,
  })
);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

await ensureDir(DATA_DIR);
await ensureDir(UPLOADS_DIR);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname || "");
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({ storage });

const playerSchema = z.object({
  uid: z.string().min(1),
  name: z.string().min(1),
});

const payloadSchema = z.object({
  type: z.enum(["Solo", "Duo", "Squad"]),
  players: z.array(playerSchema),
  fullName: z.string().min(1),
  upiId: z.string().min(1),
  paymentMode: z.enum(["Cash", "Online"]),
  utrNumber: z.string().optional().or(z.literal("")),
  cashCollectorName: z.string().optional().or(z.literal("")),
});

function expectedPlayersCount(type) {
  if (type === "Solo") return 1;
  if (type === "Duo") return 2;
  return 4;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/register", async (_req, res) => {
  const jsonlPath = path.join(DATA_DIR, "registrations.jsonl");
  try {
    const content = await fs.readFile(jsonlPath, "utf8");
    const items = content
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l));
    res.json({ items });
  } catch (e) {
    res.json({ items: [] });
  }
});

app.post("/register", upload.single("screenshot"), async (req, res) => {
  try {
    const fields = req.body || {};
    let players = [];
    try {
      players = JSON.parse(fields.players || "[]");
    } catch {
      players = [];
    }

    const parsed = payloadSchema.safeParse({
      type: fields.type,
      players,
      fullName: fields.fullName,
      upiId: fields.upiId,
      paymentMode: fields.paymentMode,
      utrNumber: fields.utrNumber,
      cashCollectorName: fields.cashCollectorName,
    });

    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    }

    const expected = expectedPlayersCount(parsed.data.type);
    if (players.length !== expected) {
      return res
        .status(400)
        .json({ error: `Expected ${expected} players for ${parsed.data.type}` });
    }

    if (parsed.data.paymentMode === "Cash" && !parsed.data.cashCollectorName) {
      return res
        .status(400)
        .json({ error: "cashCollectorName is required when paymentMode is Cash" });
    }

    if (parsed.data.paymentMode === "Online" && !parsed.data.utrNumber) {
      return res
        .status(400)
        .json({ error: "utrNumber is required when paymentMode is Online" });
    }

    const storedScreenshot = req.file ? req.file.filename : null;

    const record = {
      id: crypto.randomUUID(),
      type: parsed.data.type,
      players: parsed.data.players,
      fullName: parsed.data.fullName,
      upiId: parsed.data.upiId,
      paymentMode: parsed.data.paymentMode,
      utrNumber: parsed.data.utrNumber || null,
      cashCollectorName: parsed.data.cashCollectorName || null,
      screenshot: storedScreenshot,
      createdAt: new Date().toISOString(),
    };

    const jsonlPath = path.join(DATA_DIR, "registrations.jsonl");
    await fs.appendFile(jsonlPath, JSON.stringify(record) + "\n", "utf8");

    res.status(201).json({ ok: true, id: record.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`play-backend listening on http://localhost:${port}`);
});