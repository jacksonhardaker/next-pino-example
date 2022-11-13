import { NextApiHandler } from "next";
import pino from "pino-http";
import type { HttpLogger as PinoHttpLogger } from "pino-http";

export const logger: PinoHttpLogger | null =
  process.env.LOGGING === "true" ? pino() : null;

export const withLogging = (next: NextApiHandler): NextApiHandler => {
  const handler: NextApiHandler = (req, res) => {
    logger?.(req, res);
    return next(req, res);
  };

  return handler;
};
