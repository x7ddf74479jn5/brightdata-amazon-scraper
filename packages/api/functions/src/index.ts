import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { adminDb } from "./firebaseAdmin";

const fetchResults = async (id: string): Promise<any> => {
  const api_key = process.env.BRIGHTDATA_API_KEY;

  const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });

  const data = await res.json();

  if (data.status === "building" || data.status === "collecting") {
    console.log("NOT COMPLETED YET, TRYING AGAIN....");
    return fetchResults(id);
  }
};

export const onScraperComplete = functions.https.onRequest(async (request, response) => {
  console.log("SCRAPE COMPLETE >>> : ", request.body);

  const { success, id } = request.body;

  if (!success) {
    await adminDb.collection("searches").doc(id).set(
      {
        status: "error",
        updatedAt: admin.firestore.Timestamp.now(),
      },
      {
        merge: true,
      }
    );
  }

  const data = fetchResults(id);

  await adminDb.collection("searches").doc(id).set(
    {
      status: "complete",
      updatedAt: admin.firestore.Timestamp.now(),
      results: data,
    },
    {
      merge: true,
    }
  );

  response.send("Scraping Function Finishied!");
});
