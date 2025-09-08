import { z } from "zod";

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  created_at: z.string(),
  last_sign_in_at: z.string(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string().min(1, "사용자명을 입력해주세요."),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  created_at: z.string(),
  updated_at: z.string(),
  profile_image_url: z.string().url("유효하지 않은 URL입니다.").nullish(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const UserSchema = AuthUserSchema.merge(
  UserProfileSchema.omit({ id: true, user_id: true, created_at: true, updated_at: true })
);
export type User = z.infer<typeof UserSchema>;
