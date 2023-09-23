// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { getAllCribs } from "../../../utils/queries";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const query = getAllCribs();

    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = req.body;
    await client.create(document);
    res.status(201).json({ message: "Message Sent" });
  }
}
