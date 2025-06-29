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
  return {
    ok: res.ok,
    status: res.status,
    ...result,
  };
}