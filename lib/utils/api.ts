import { ApiResponse } from "@/types/api/api";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, any> | string;
};

export async function apiRequest<T>(url: string, options: ApiRequestOptions = {}):Promise<ApiResponse<T>> {
  const { body, ...rest } = options;
  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

  const result = await res.json();
  if (res.ok) {
    // 성공
    return {
      ok: true,
      status: res.status,
      success: true,
      data: result.data ?? result,
    };
  } else {
    // 실패
    return {
      ok: false,
      status: res.status,
      success: false,
      errors: result.errors,
      code: result.code,
    };
  }
}