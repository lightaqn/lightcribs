// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { getCribDetail } from "../../../utils/queries";
import { uuid } from "uuidv4";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = getCribDetail(id);
    const data = await client.fetch(query);
    res.status(201).json(data[0]);
  } else if (req.method === "PUT") {
    const { profileId, review } = req.body;
    const { id } = req.query;
    await client
      .patch(id)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [
        { review, _key: uuid(), author: { _type: "author", _ref: profileId } },
      ]);
    res.status(200).json({ name: "Review Updated" });
  }
}
