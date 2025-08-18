import { createClient } from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true, message: "Logged out" });

  const supabase = await createClient();
  supabase.auth.signOut();

  return res;
}