import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true, message: "Logged out" });

  res.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}