// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import {
  getLoneProfile,
  getProfileLikedCrib,
  getProfileMadeCrib,
} from "../../../utils/queries";
import { uuid } from "uuidv4";

// type Data = {
//   name: string;
// };
// res: NextApiResponse<Data>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const loneProfileQuery = getLoneProfile(id);
    const profileMadeQuery = getProfileMadeCrib(id);
    const profileLikedQuery = getProfileLikedCrib(id);

    const profile = await client.fetch(loneProfileQuery);
    const profileMade = await client.fetch(profileMadeQuery);
    const profileLiked = await client.fetch(profileLikedQuery);
    res.status(200).json({ profile: profile[0], profileMade, profileLiked });
  }
}
