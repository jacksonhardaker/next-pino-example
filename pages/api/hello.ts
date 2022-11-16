// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withLogging } from "../../src/logging/server";

type Data = {
  name: string;
};

export default withLogging(
  (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
      if (Math.random() > 0.5) {
        throw Error("Boom");
      }
      res.status(200).json({ name: "John Doe" });
    } catch (error) {
      res.status(500).end();
    }
  }
);
