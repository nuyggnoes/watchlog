import { ErrorType } from "@/constants/errors";
import { supabase } from "@/lib/supabaseClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const profileImage = formData.get("profileImage") as File;
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

  // 2. 에러가 있으면 미리 리턴
  if (errors.length > 0) {
    return createValidationErrorResponse(errors);
  }

  // 3. 회원가입 (일단 트리거 없이 테스트)
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Signup error:', error);
    if (error.message.toLowerCase().includes("already registered")) {
      return createValidationErrorResponse([ErrorType.DUPLICATE_EMAIL]);
    } else {
      return createValidationErrorResponse([ErrorType.SIGNUP_FAIL]);
    }
  }

  const userId = data.user?.id;
  if (!userId) {
    return createValidationErrorResponse([ErrorType.SIGNUP_FAIL]);
  }

  // 4. 프로필 사진 업로드 (있는 경우)
  let profileImageUrl = null;
  if (profileImage && profileImage.size > 0) {
    const fileExt = profileImage.name.split('.').pop();
    const fileName = `${userId}/profile.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(fileName, profileImage, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error('Profile image upload error:', uploadError);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from("profiles")
        .getPublicUrl(fileName);
      profileImageUrl = publicUrl;
    }
  }

  // 5. 수동으로 프로필 생성
  const { error: insertError } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      email,
      name,
      profile_image_url: profileImageUrl,
    });

  if (insertError) {
    console.error('Profile insert error:', insertError);
    return createValidationErrorResponse([ErrorType.PROFILE_SAVE_FAIL]);
  }

  return NextResponse.json({ success: true });
}
