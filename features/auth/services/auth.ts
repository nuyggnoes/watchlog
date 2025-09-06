import { UserRepository } from "@/entities/user/repo/user.repo";
import { createClient } from "@/shared/lib/supabase/serverClient";
import { AuthErrorType } from "../constants/auth-errors";
import { BaseErrorType } from "@/shared/constants/base-errors";

export class AuthService {
  private userRepo = new UserRepository();

  async login(email: string, password: string) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          return { success: false, error: AuthErrorType.LOGIN_ERROR };
        }
        return { success: false, error: BaseErrorType.UNEXPECTED_ERROR };
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: BaseErrorType.UNEXPECTED_ERROR };
    }
  }
}
