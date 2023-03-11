import { NextRequest } from "next/server";

type Body = {
  search: string;
};
export async function POST(req: NextRequest) {
  const search = req.body.search;
}
