"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";

export function LoginForm() {
  const { form, errors, handleSubmit, handleChange } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.login && <p className="text-red-500">{errors.login}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
