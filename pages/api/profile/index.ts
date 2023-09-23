// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { getAllProfiles } from "../../../utils/queries";

// type Data = {
//   name: string;
// };
// res: NextApiResponse<Data>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = getAllProfiles();

    const data = await client.fetch(query);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  }
}
