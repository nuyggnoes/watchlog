import { UserRepository } from "@/entities/user/repo/user.repo";
import { createClient } from "@/shared/lib/supabase/serverClient";
import { AuthErrorType } from "../constants/auth-errors";
import { BaseErrorType } from "@/shared/constants/base-errors";
import { SignUpRequest } from "../model/schema";
import { SupabaseStorage } from "@/lib/supabase/storage";

export class AuthService {
  private userRepo = new UserRepository();

  async signup({ email, password, name, profileImage }: SignUpRequest) {
    try {
      const supabase = await createClient();

      const errors: AuthErrorType[] = [];

      const existingUserByEmail = await this.userRepo.findByEmail(email);
      if (existingUserByEmail.data) {
        errors.push(AuthErrorType.DUPLICATE_EMAIL);
      }

      const existingUserByName = await this.userRepo.findByName(name);
      if (existingUserByName.data) {
        errors.push(AuthErrorType.DUPLICATE_NAME);
      }

      if (errors.length > 0) {
        return { success: false, errors };
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          return { success: false, errors: [AuthErrorType.DUPLICATE_EMAIL] };
        }
        return { success: false, errors: [AuthErrorType.SIGNUP_FAIL] };
      }

      if (!authData.user) {
        return { success: false, errors: [AuthErrorType.SIGNUP_FAIL] };
      }

      let profileImageUrl: string | null = null;

      if (profileImage) {
        const storageService = SupabaseStorage.getInstance();
        const uploadResult = await storageService.uploadProfileImage(authData.user.id, profileImage, supabase);

        if (!uploadResult.success) {
          return { success: false, errors: [AuthErrorType.PROFILE_SAVE_FAIL] };
        }

        profileImageUrl = uploadResult.url!;
      }

      const profileData = {
        user_id: authData.user.id,
        name,
        email,
        profile_image_url: profileImageUrl,
      };

      const { error: profileError } = await this.userRepo.create(profileData);

      if (profileError) {
        return { success: false, errors: [AuthErrorType.PROFILE_SAVE_FAIL] };
      }

      return {
        success: true,
        user: authData.user,
        profile: profileData,
      };
    } catch (error) {
      return { success: false, errors: [BaseErrorType.UNEXPECTED_ERROR] };
    }
  }

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

  async logout() {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: BaseErrorType.UNEXPECTED_ERROR };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: BaseErrorType.UNEXPECTED_ERROR };
    }
  }

  async checkDuplicates(email: string, name: string) {
    try {
      const errors: AuthErrorType[] = [];

      const existingUserByEmail = await this.userRepo.findByEmail(email);
      if (existingUserByEmail.data) {
        errors.push(AuthErrorType.DUPLICATE_EMAIL);
      }

      const existingUserByName = await this.userRepo.findByName(name);
      if (existingUserByName.data) {
        errors.push(AuthErrorType.DUPLICATE_NAME);
      }

      if (errors.length > 0) {
        return { success: false, errors };
      }

      return { success: true };
    } catch (error) {
      return { success: false, errors: [BaseErrorType.UNEXPECTED_ERROR] };
    }
  }
}
