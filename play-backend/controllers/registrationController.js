import { z } from "zod";
import { Registration } from "../models/Registration.js";
import path from "path";
import fs from "fs";
import { config } from "../config/env.js";

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

export async function createRegistration(req, res) {
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
      return res.status(400).json({ error: `Expected ${expected} players for ${parsed.data.type}` });
    }

    if (parsed.data.paymentMode === "Cash" && !parsed.data.cashCollectorName) {
      return res.status(400).json({ error: "cashCollectorName is required when paymentMode is Cash" });
    }

    if (parsed.data.paymentMode === "Online" && !parsed.data.utrNumber) {
      return res.status(400).json({ error: "utrNumber is required when paymentMode is Online" });
    }

    const storedScreenshot = req.file ? req.file.filename : null;

    const registration = await Registration.create({
      ...parsed.data,
      utrNumber: parsed.data.utrNumber || null,
      cashCollectorName: parsed.data.cashCollectorName || null,
      screenshot: storedScreenshot,
      createdBy: req.user?.id || null,
    });

    res.status(201).json({ ok: true, id: registration._id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function listRegistrations(req, res) {
  try {
    const filter = req.user?.id ? { createdBy: req.user.id } : {};
    const items = await Registration.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}