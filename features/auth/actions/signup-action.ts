"use server";

import { ActionErrorHandler } from "@/shared/lib/errors/action-error-handler";
import { SignUpRequest, SignUpSchema } from "../model/schema";
import { AuthService } from "../services/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthErrorType, AuthErrorMap } from "../constants/auth-errors";

export async function signupAction(preState: any, formData: FormData) {
  try {
    const profileImageData = formData.get("profileImage");
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      profileImage: profileImageData && profileImageData !== "" ? (profileImageData as File) : undefined,
    };

    const validation = SignUpSchema.safeParse(rawData);

    const allFieldErrors: { [key: string]: string } = {};

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!allFieldErrors[fieldName]) {
          allFieldErrors[fieldName] = issue.message;
        }
      });
    }

    const authService = new AuthService();

    if (rawData.email && rawData.name) {
      const duplicateCheckResult = await authService.checkDuplicates(rawData.email, rawData.name);

      if (!duplicateCheckResult.success) {
        (duplicateCheckResult.errors! as AuthErrorType[]).forEach((errorType: AuthErrorType) => {
          if (errorType in AuthErrorMap) {
            const errorInfo = AuthErrorMap[errorType];
            allFieldErrors[errorInfo.name] = errorInfo.message;
          }
        });
      }
    }

    if (Object.keys(allFieldErrors).length > 0) {
      return {
        success: false,
        errors: allFieldErrors,
        values: {
          email: rawData.email,
          name: rawData.name,
        },
      };
    }

    if (!validation.success) {
      throw new Error("Validation failed but no errors collected");
    }

    const signupData: SignUpRequest = validation.data;

    const result = await authService.signup(signupData);

    if (!result.success) {
      return {
        success: false,
        errors: {
          general: "회원가입 중 오류가 발생했습니다.",
        },
      };
    }

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return ActionErrorHandler.handle(error, "signup");
  }
}
