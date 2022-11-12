import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = await NextResponse.next();

  return res;
};
