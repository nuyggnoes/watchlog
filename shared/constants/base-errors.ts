export enum BaseErrorType {
  UNAUTHORIZED = "UNAUTHORIZED",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
}

export const BaseErrorMap: Record<BaseErrorType, { name: string; message: string; status: number }> = {
  [BaseErrorType.UNAUTHORIZED]: {
    name: "unauthorized",
    message: "로그인이 필요합니다.",
    status: 401,
  },
  [BaseErrorType.UNEXPECTED_ERROR]: {
    name: "unexpected",
    message: "예기치 못한 오류가 발생했습니다.",
    status: 500,
  },
  [BaseErrorType.NETWORK_ERROR]: {
    name: "network",
    message: "네트워크 오류가 발생했습니다.",
    status: 503,
  },
};
