import morgan from "morgan";

export const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms");

export const logger = {
  info: (...args) => console.log("[info]", ...args),
  warn: (...args) => console.warn("[warn]", ...args),
  error: (...args) => console.error("[error]", ...args),
};