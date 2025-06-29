"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSignupForm } from "@/hooks/useSignup";

export function SignupForm() {
  const { form, errors, handleChange, handleSubmit } = useSignupForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          name="password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">NickName</Label>
        <Input id="name" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}
