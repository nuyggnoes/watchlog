import { ErrorType } from "@/constants/errors";
import { createClient } from "@/lib/supabase/serverClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const errors: ErrorType[] = [];
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      errors.push(ErrorType.LOGIN_ERROR);
    } else {
      errors.push(ErrorType.UNEXPECTED_ERROR);
    }
  }
  if (errors.length > 0 || !data) {
    return createValidationErrorResponse(errors);
  }

  return NextResponse.json({
    success: true,
    user: data.user,
  });
}
