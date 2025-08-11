export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";

const playerSchema = z.object({
  uid: z.string().min(1),
  name: z.string().min(1),
});

const baseSchema = z.object({
  type: z.enum(["Solo", "Duo", "Squad"]),
  players: z.array(playerSchema),
  fullName: z.string().min(1),
  upiId: z.string().min(1),
  paymentMode: z.enum(["Cash", "Online"]),
  utrNumber: z.string().optional().or(z.literal("")),
  cashCollectorName: z.string().optional().or(z.literal("")),
});

function getExpectedPlayersCount(type: "Solo" | "Duo" | "Squad"): number {
  if (type === "Solo") return 1;
  if (type === "Duo") return 2;
  return 4;
}

async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

async function appendJsonL(filePath: string, record: unknown) {
  const line = JSON.stringify(record) + "\n";
  await fs.appendFile(filePath, line, { encoding: "utf8" });
}

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");
  const jsonlPath = path.join(dataDir, "registrations.jsonl");
  try {
    const content = await fs.readFile(jsonlPath, "utf8");
    const lines = content.split("\n").filter(Boolean);
    const items = lines.map((l) => JSON.parse(l));
    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // If file not found, return empty list
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const type = (formData.get("type") as string) || "";
    const fullName = (formData.get("fullName") as string) || "";
    const upiId = (formData.get("upiId") as string) || "";
    const paymentMode = (formData.get("paymentMode") as string) || "";
    const utrNumber = (formData.get("utrNumber") as string) || "";
    const cashCollectorName = (formData.get("cashCollectorName") as string) || "";
    const playersRaw = (formData.get("players") as string) || "";

    let players: Array<{ uid: string; name: string }>; 
    try {
      players = JSON.parse(playersRaw || "[]");
    } catch {
      players = [];
    }

    const parsed = baseSchema.safeParse({
      type,
      players,
      fullName,
      upiId,
      paymentMode,
      utrNumber,
      cashCollectorName,
    });

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: parsed.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const expectedCount = getExpectedPlayersCount(parsed.data.type);
    if (players.length !== expectedCount) {
      return new Response(
        JSON.stringify({ error: `Expected ${expectedCount} players for ${parsed.data.type}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (parsed.data.paymentMode === "Cash" && !parsed.data.cashCollectorName) {
      return new Response(
        JSON.stringify({ error: "cashCollectorName is required when paymentMode is Cash" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (parsed.data.paymentMode === "Online" && !parsed.data.utrNumber) {
      return new Response(
        JSON.stringify({ error: "utrNumber is required when paymentMode is Online" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const upload = formData.get("screenshot") as File | null;

    const dataDir = path.join(process.cwd(), "data");
    const uploadsDir = path.join(dataDir, "uploads");
    await ensureDir(uploadsDir);

    let storedScreenshotFilename: string | null = null;
    if (upload && typeof upload === "object" && "arrayBuffer" in upload) {
      const bytes = Buffer.from(await upload.arrayBuffer());
      const ext = path.extname(upload.name || "").slice(0, 10) || ".bin";
      const fileName = `${crypto.randomUUID()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, bytes);
      storedScreenshotFilename = fileName;
    }

    const record = {
      id: crypto.randomUUID(),
      type: parsed.data.type,
      players: parsed.data.players,
      fullName: parsed.data.fullName,
      upiId: parsed.data.upiId,
      paymentMode: parsed.data.paymentMode,
      utrNumber: parsed.data.utrNumber || null,
      cashCollectorName: parsed.data.cashCollectorName || null,
      screenshot: storedScreenshotFilename,
      createdAt: new Date().toISOString(),
    };

    const jsonlPath = path.join(dataDir, "registrations.jsonl");
    await ensureDir(dataDir);
    await appendJsonL(jsonlPath, record);

    return new Response(JSON.stringify({ ok: true, id: record.id }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}