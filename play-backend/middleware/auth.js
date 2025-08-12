import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.id };
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}