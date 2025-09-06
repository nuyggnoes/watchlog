export enum AuthErrorType {
  LOGIN_ERROR = "LOGIN_ERROR",
  SIGNUP_FAIL = "SIGNUP_FAIL",
}

export const AuthErrorMap: Record<AuthErrorType, { name: string; message: string; status: number }> = {
  [AuthErrorType.LOGIN_ERROR]: {
    name: "login",
    message: "이메일 또는 비밀번호가 틀렸습니다",
    status: 401,
  },
  [AuthErrorType.SIGNUP_FAIL]: {
    name: "signup",
    message: "회원가입에 실패했습니다",
    status: 400,
  },
};
