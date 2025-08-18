export enum ErrorType {
  DUPLICATE_EMAIL = "DUPLICATE_EMAIL",
  DUPLICATE_NAME = "DUPLICATE_NAME",
  SIGNUP_FAIL = "SIGNUP_FAIL",
  PROFILE_SAVE_FAIL = "PROFILE_SAVE_FAIL",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  LOGIN_ERROR = "LOGIN_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED"
}

export const ErrorResponseMap: Record<ErrorType, { name: string; message: string; status: number }> = {
  [ErrorType.DUPLICATE_EMAIL]: {
    name:'email',
    message: "이미 존재하는 이메일입니다.",
    status: 401,
  },
  [ErrorType.DUPLICATE_NAME]: {
    name:'name',
    message: "이미 존재하는 닉네임입니다.",
    status: 402,
  },
  [ErrorType.SIGNUP_FAIL]: {
    name:'signup',
    message: "회원가입에 실패했습니다. 다시 시도해주세요.",
    status: 400,
  },
  [ErrorType.PROFILE_SAVE_FAIL]: {
    name:'profile-save',
    message: "프로필 저장에 실패했습니다.",
    status: 500,
  },
  [ErrorType.UNEXPECTED_ERROR]: {
    name:'unexpected',
    message: "예기치 못한 오류가 발생했습니다.",
    status: 500,
  },
  [ErrorType.LOGIN_ERROR]: {
    name: 'login',
    message: "이메일 또는 비밀번호가 틀렸습니다.",
    status:404,
  },
  [ErrorType.UNAUTHORIZED]: {
    name: 'unauthorized',
    message: "로그인이 필요합니다.",
    status: 401,
  },
}