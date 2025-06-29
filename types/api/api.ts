type ApiSuccessResponse<T> = {
  ok: true;
  status: number;
  success: true;
  data?: T;
};

type ApiErrorResponse = {
  ok: false;
  status: number;
  success?: false;
  errors?: Record<string, string>;
  code?: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
