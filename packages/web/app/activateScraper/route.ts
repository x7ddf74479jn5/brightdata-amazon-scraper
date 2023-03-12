import { NextRequest } from "next/server";

type Body = {
  search: string;
};
export async function POST(req: NextRequest) {
  console.log("Submitting...");

  // const { search } =  req.body;
}
