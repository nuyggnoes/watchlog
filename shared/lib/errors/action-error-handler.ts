import { AuthErrorType, AuthErrorMap } from "@/features/auth/constants/auth-errors";
import { BaseErrorType, BaseErrorMap } from "@/shared/constants/base-errors";
import { ZodError } from "zod";

export interface ActionState {
  success: boolean;
  errors?: {
    [field: string]: string;
  };
  values?: {
    [field: string]: string;
  };
}

export class ActionErrorHandler {
  static handle(error: unknown, field: string = "general"): ActionState {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: {
          [field]: error.issues[0]?.message || "입력값이 유효하지 않습니다",
        },
      };
    }

    if (typeof error === "string" && error in AuthErrorType) {
      return {
        success: false,
        errors: {
          [field]: AuthErrorMap[error as AuthErrorType].message,
        },
      };
    }

    if (typeof error === "string" && error in BaseErrorType) {
      return {
        success: false,
        errors: {
          [field]: BaseErrorMap[error as BaseErrorType].message,
        },
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        errors: {
          [field]: error.message || "오류가 발생했습니다",
        },
      };
    }

    return {
      success: false,
      errors: {
        [field]: "예기치 못한 오류가 발생했습니다",
      },
    };
  }

  static getErrorMessage(errorType: string): string {
    if (errorType === AuthErrorType.LOGIN_ERROR) {
      return AuthErrorMap[AuthErrorType.LOGIN_ERROR].message;
    }

    if (errorType in BaseErrorMap) {
      return BaseErrorMap[errorType as keyof typeof BaseErrorMap].message;
    }

    return "오류가 발생했습니다";
  }
}
