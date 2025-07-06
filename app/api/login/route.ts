import { ErrorType } from "@/constants/errors";
import { supabase } from "@/lib/supabaseClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const errors: ErrorType[] = [];

  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      errors.push(ErrorType.LOGIN_ERROR);
    } else {
      errors.push(ErrorType.UNEXPECTED_ERROR);
    }
  }
  if (errors.length > 0) {
    return createValidationErrorResponse(errors);
  }

  // 로그인 성공
  const response = NextResponse.json({
    success: true,
    user: data.user,
  });
  
  response.cookies.set("access_token", data.session!.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set("refresh_token", data.session!.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response;
}