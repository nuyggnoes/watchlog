type ApiSuccessResponse<T> = {
  ok: true;
  data?: T;
  message?: string;
};

type ApiErrorResponse = {
  ok: false;
  message: string;
  errors?: Record<string, string>;
  code?: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
