// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SanityDocument } from "@sanity/client";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";

interface IData {
  name: string;
  data: SanityDocument<Record<string, any>>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  if (req.method === "PUT") {
    const { profileId, cribId, like } = req.body;
    const { id } = req.query;
    const data = like
      ? await client
          .patch(cribId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [{ _key: uuid(), _ref: profileId }])
          .commit()
      : await client
          .patch(cribId)
          .unset([`likes[_ref == '${profileId}]`])

          .commit();
    res.status(200).json(data);
  }
}
