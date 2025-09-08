"use server";

import { AuthService } from "../services/auth";
import { LoginSchema, type LoginRequest } from "../model/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ActionErrorHandler } from "@/shared/lib/errors/action-error-handler";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const validation = LoginSchema.safeParse(rawData);

    if (!validation.success) {
      return ActionErrorHandler.handle(validation.error, "login");
    }
    const loginData: LoginRequest = validation.data;

    const authService = new AuthService();
    const result = await authService.login(loginData.email, loginData.password);
    if (!result.success) {
      return {
        success: false,
        errors: {
          login: ActionErrorHandler.getErrorMessage(result.error!),
        },
      };
    }
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return ActionErrorHandler.handle(error, "login");
  }
}
