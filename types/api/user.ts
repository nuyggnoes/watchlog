import { ErrorType } from "@/constants/errors";

export type SignUpRequest = {
    email: string;
    password: string;
    name: string;
}

export type SignUpSuccessResponse = {
    success: true;
}

export type SignUpErrorResponse = {
  error: string;
  code: ErrorType;
};

export type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse;