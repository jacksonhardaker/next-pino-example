// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../src/logging/server";
import type { Level } from "pino";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req;
    const { level, ...data } = body as { level: Level; data: any };

    if (logger) {
      logger.logger?.[level]?.({ source: "client", ...data });
    }
    res.status(200).send("ok");
  } catch {
    res.status(500).end("failure");
  }
};

export default handler;
