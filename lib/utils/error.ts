import { ErrorResponseMap, ErrorType } from "@/constants/errors";
import { NextResponse } from "next/server";

// export function createErrorResponse(code: ErrorType) {
//   const { message, status } = ErrorResponseMap[code];
//   return NextResponse.json(
//     { error: message, code },
//     { status }
//   )
// }

export function createValidationErrorResponse(errorCodes: ErrorType[]) {
  const errors: Record<string, string> = {};
  let status = 400;

  for (const code of errorCodes) {
    const errorInfo = ErrorResponseMap[code];
    const field = errorInfo.name ?? "form";

    errors[field] = errorInfo.message;
    status = Math.max(status, errorInfo.status);
  }
  // errorFields.forEach((code) => {
  //   const { message, status: fieldStatus } = ErrorResponseMap[code];
  //   const field = code.split("_").pop()?.toLowerCase() ?? "unknown";

  //   errors[field] = message;
  //   if (fieldStatus > status) status = fieldStatus;
  // });

  return NextResponse.json(
    {
      success: false,
      code: "VALIDATION_ERROR",
      errors, // 👉 { email: "...", name: "..." }
    },
    { status }
  );
}