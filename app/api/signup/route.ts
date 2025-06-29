import { ErrorType } from "@/constants/errors";
import { supabase } from "@/lib/supabaseClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const errors: ErrorType[] = [];

  // 1. 닉네임 중복 확인
  const { data: existingNameRes } = await supabase
    .from("profiles")
    .select("name")
    .eq("name", name)
    .maybeSingle();

  if (existingNameRes) {
    errors.push(ErrorType.DUPLICATE_NAME);
  }

  // 2. 이메일 등록 시도
  const { data, error } = await supabase.auth.signUp({ email, password });

  let userId = data.user?.id ?? null;

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      errors.push(ErrorType.DUPLICATE_EMAIL);
    } else {
      // signUp 자체 실패 (다른 이유)
      return createValidationErrorResponse([ErrorType.SIGNUP_FAIL]);
    }
  }

  // 3. 에러가 하나라도 있으면 모아서 리턴
  if (errors.length > 0) {
    return createValidationErrorResponse(errors);
  }

  // 4. 프로필 저장
  const { error: insertError } = await supabase.from("profiles").insert({
    user_id: userId,
    name,
  });

  if (insertError) {
    return createValidationErrorResponse([ErrorType.PROFILE_SAVE_FAIL]);
  }

  return NextResponse.json({ success: true });

  // // 1. 이메일 중복 체크
  // const { data, error } = await supabase.auth.signUp({ email, password });

  // if (error) {
  //   // 이미 존재하는 이메일일 가능성이 높음
  //   return createErrorResponse(ErrorType.DUPLICATE_EMAIL);
  // }

  // const userId = data.user?.id;

  // if (!userId) {
  //   return createErrorResponse(ErrorType.SIGNUP_FAIL);
  // }

  // // 2. 닉네임 중복 체크
  // const { data: existing, error: dupCheckError } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("name", name)
  //   .single();

  // if (existing) {
  //   return createErrorResponse(ErrorType.DUPLICATE_NAME);
  // }

  // // 3. 프로필 저장
  // const { error: insertError } = await supabase.from("profiles").insert({
  //   user_id: userId,
  //   name,
  // });

  // if (insertError) {
  //   return createErrorResponse(ErrorType.PROFILE_SAVE_FAIL);
  // }

  // return NextResponse.json({ success: true });

}
