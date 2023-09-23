// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

// type Data = {
//   name: string;
// };
// res: NextApiResponse<Data>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const profile = req.body;

    await client
      .createIfNotExists(profile)
      .then(() => res.status(200).json("Logged in"));
  }
}
