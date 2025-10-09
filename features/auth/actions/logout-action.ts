"use server";

import { ActionErrorHandler } from "@/shared/lib/errors/action-error-handler";
import { AuthService } from "../services/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function logoutAction() {
  try {
    const authService = new AuthService();
    const result = await authService.logout();

    if (!result.success) {
      return {
        success: false,
        errors: {
          logout: ActionErrorHandler.getErrorMessage(result.error!),
        },
      };
    }
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return ActionErrorHandler.handle(error, "logout");
  }
}
