"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "@/features/auth/actions/login-action";
import LoadingOverLay from "./ui/loading-overlay";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      {isPending && <LoadingOverLay />}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" placeholder="Enter your email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" placeholder="Enter your password" required />
        {state?.errors?.login && <p className="text-red-500">{state.errors.login}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "로그인 중..." : "Sign In"}
      </Button>
    </form>
  );
}
