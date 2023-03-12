import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../firebaseAdmin";
import * as admin from "firebase-admin";

type Data = {
  collection_id: string;
  start_eta: string;
};

type Error = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    const { search } = req.body;

    console.log("Search is >>> ", search);

    const response = await fetch(process.env.BRIGHTDATA_TRIGGER_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    });

    const data = await response.json();

    console.log("Data is >>> ", data);

    const { collection_id, start_eta } = data;

    await adminDb.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updateAt: start_eta,
    });

    res.status(200).json({
      collection_id,
      start_eta,
    });
  } catch (err: any) {
    console.error("Error is >>> ", err);

    return res.status(500).json({ error: err.message });
  }
}
