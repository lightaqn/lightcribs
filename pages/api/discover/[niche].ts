import { NextApiRequest, NextApiResponse } from "next";
import { getNichedCrib } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { niche } = req.query;
    const NichedCribs = getNichedCrib(niche);
    const response = await client.fetch(NichedCribs);
    res.status(200).json(response);
  }
}
