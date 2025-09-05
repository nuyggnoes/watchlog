import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요."),
  profileImageUrl: z.string().url("유효하지 않은 URL입니다.").nullish(),
});

export type User = z.infer<typeof UserSchema>;