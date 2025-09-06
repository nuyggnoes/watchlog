"use server";

import { AuthService } from "../services/auth";
import { LoginSchema, type LoginRequest } from "../model/schema";
import { AuthErrorType, AuthErrorMap } from "../constants/auth-errors";
import { BaseErrorMap } from "@/shared/constants/base-errors";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAction(prevState: any, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = LoginSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: {
        login: validation.error.issues[0]?.message || "입력값이 유효하지 않습니다",
      },
    };
  }

  const loginData: LoginRequest = validation.data;

  const authService = new AuthService();
  const result = await authService.login(loginData.email, loginData.password);

  if (!result.success) {
    let errorMessage = "로그인에 실패했습니다";

    if (result.error === AuthErrorType.LOGIN_ERROR) {
      errorMessage = AuthErrorMap[AuthErrorType.LOGIN_ERROR].message;
    } else if (result.error! in BaseErrorMap) {
      errorMessage = BaseErrorMap[result.error as keyof typeof BaseErrorMap].message;
    }

    return {
      success: false,
      errors: {
        login: errorMessage,
      },
    };
  }

  revalidatePath("/");
  redirect("/");
}
