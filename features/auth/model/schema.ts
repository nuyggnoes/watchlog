import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const SignUpSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "영문과 숫자를 포함해야 합니다."),
  name: z.string().min(1, "이름을 입력해주세요."),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type SignUpRequest = z.infer<typeof SignUpSchema>;
