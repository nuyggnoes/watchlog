import { AuthErrorType, AuthErrorMap } from "@/features/auth/constants/auth-errors";
import { BaseErrorType, BaseErrorMap } from "@/shared/constants/base-errors";
import { ZodError } from "zod";

// Server Actions용 응답 타입
export interface ActionState {
  success: boolean;
  errors?: {
    [field: string]: string;
  };
}

// API Routes용 응답 타입
export interface ApiErrorResponse {
  success: false;
  error: string;
  status: number;
}

// 외부 API용 응답 타입
export interface ExternalApiErrorResponse {
  success: false;
  error: string;
  originalError?: unknown;
}

export class ErrorHandler {
  static handleActionError(error: unknown, field: string = "general"): ActionState {
    // Zod 유효성 검사 에러
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: {
          [field]: error.issues[0]?.message || "입력값이 유효하지 않습니다",
        },
      };
    }

    // 인증 관련 에러
    if (typeof error === "string" && error in AuthErrorType) {
      return {
        success: false,
        errors: {
          [field]: AuthErrorMap[error as AuthErrorType].message,
        },
      };
    }

    // 기본 에러
    if (typeof error === "string" && error in BaseErrorType) {
      return {
        success: false,
        errors: {
          [field]: BaseErrorMap[error as BaseErrorType].message,
        },
      };
    }

    // 예상치 못한 에러
    return {
      success: false,
      errors: {
        [field]: "예기치 못한 오류가 발생했습니다.",
      },
    };
  }

  /**
   * API Routes용 에러 처리
   * NextResponse.json()에 사용할 수 있는 형태로 반환
   */
  static handleApiError(error: unknown): ApiErrorResponse {
    // Zod 유효성 검사 에러
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "입력값이 유효하지 않습니다",
        status: 400,
      };
    }

    // 인증 관련 에러
    if (typeof error === "string" && error in AuthErrorType) {
      const authError = AuthErrorMap[error as AuthErrorType];
      return {
        success: false,
        error: authError.message,
        status: authError.status,
      };
    }

    // 기본 에러
    if (typeof error === "string" && error in BaseErrorType) {
      const baseError = BaseErrorMap[error as BaseErrorType];
      return {
        success: false,
        error: baseError.message,
        status: baseError.status,
      };
    }

    // HTTP 에러
    if (error instanceof Error) {
      if (error.message.includes("404") || error.message.includes("Not Found")) {
        return { success: false, error: "요청한 리소스를 찾을 수 없습니다", status: 404 };
      }
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        return { success: false, error: "인증이 필요합니다", status: 401 };
      }
      if (error.message.includes("403") || error.message.includes("Forbidden")) {
        return { success: false, error: "권한이 없습니다", status: 403 };
      }
    }

    // 예상치 못한 에러
    return {
      success: false,
      error: "서버 오류가 발생했습니다",
      status: 500,
    };
  }

  /**
   * 외부 API (TMDB 등)용 에러 처리
   * 외부 API 호출 실패 시 사용
   */
  static handleExternalApiError(error: unknown, apiName: string = "외부 API"): ExternalApiErrorResponse {
    // fetch 에러
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: `${apiName} 연결에 실패했습니다. 네트워크를 확인해주세요.`,
        originalError: error,
      };
    }

    // HTTP 응답 에러
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        return {
          success: false,
          error: `${apiName}에서 데이터를 가져오는데 실패했습니다`,
          originalError: error,
        };
      }
      
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        return {
          success: false,
          error: `${apiName} 인증에 실패했습니다. API 키를 확인해주세요.`,
          originalError: error,
        };
      }
      
      if (error.message.includes("429") || error.message.includes("rate limit")) {
        return {
          success: false,
          error: `${apiName} 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.`,
          originalError: error,
        };
      }
      
      if (error.message.includes("500")) {
        return {
          success: false,
          error: `${apiName} 서버에서 오류가 발생했습니다`,
          originalError: error,
        };
      }

      return {
        success: false,
        error: error.message || `${apiName}에서 오류가 발생했습니다`,
        originalError: error,
      };
    }

    // 기타 에러
    return {
      success: false,
      error: `${apiName}에서 예상치 못한 오류가 발생했습니다`,
      originalError: error,
    };
  }

  /**
   * Service 결과에서 에러 메시지 추출
   * 현재 AuthService.login() 결과 구조에 맞춤
   */
  static getErrorMessage(error: string): string {
    if (error === AuthErrorType.LOGIN_ERROR) {
      return AuthErrorMap[AuthErrorType.LOGIN_ERROR].message;
    }

    if (error in BaseErrorMap) {
      return BaseErrorMap[error as keyof typeof BaseErrorMap].message;
    }

    return "오류가 발생했습니다.";
  }
}
