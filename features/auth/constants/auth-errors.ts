export enum AuthErrorType {
  LOGIN_ERROR = "LOGIN_ERROR",
  SIGNUP_FAIL = "SIGNUP_FAIL",
  DUPLICATE_EMAIL = "DUPLICATE_EMAIL",
  DUPLICATE_NAME = "DUPLICATE_NAME",
  PROFILE_SAVE_FAIL = "PROFILE_SAVE_FAIL",
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
  [AuthErrorType.DUPLICATE_EMAIL]: {
    name: "email",
    message: "이미 존재하는 이메일입니다.",
    status: 402,
  },
  [AuthErrorType.DUPLICATE_NAME]: {
    name: "name",
    message: "이미 존재하는 닉네임입니다.",
    status: 403,
  },
  [AuthErrorType.PROFILE_SAVE_FAIL]: {
    name: "profile-save",
    message: "프로필 저장에 실패했습니다.",
    status: 405,
  },
};
