import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import pino from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";

interface HttpLogger {
  (req: IncomingMessage, res: ServerResponse, next?: () => void): void;
}

export const logger: HttpLogger =
  process.env.LOGGING === "true"
    ? pino()
    : (
        req: IncomingMessage,
        res: ServerResponse,
        next?: () => void
      ): void => {};

export const withLogging = (next: NextApiHandler): NextApiHandler => {
  const handler: NextApiHandler = (req, res) => {
    logger(req, res);
    return next(req, res);
  };

  return handler;
};
