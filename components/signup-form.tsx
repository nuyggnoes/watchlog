"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImageUpload } from "@/components/profile-image-upload";
import { useActionState } from "react";
import { signupAction } from "@/features/auth/actions/signup-action";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const passwordMismatch = confirmPassword && password !== confirmPassword;

  useEffect(() => {
    console.log("useEffect triggered, profileImage:", profileImage?.name || "no file");
    if (hiddenFileInputRef.current) {
      if (profileImage) {
        console.log("Setting file to hidden input:", profileImage.name);

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(profileImage);
        hiddenFileInputRef.current.files = dataTransfer.files;
        console.log("Hidden input files count:", hiddenFileInputRef.current.files.length);
      } else {
        console.log("Clearing hidden input");
        hiddenFileInputRef.current.value = "";
      }
    } else {
      console.log("Hidden input ref not available yet");
    }
  }, [profileImage]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={state?.values?.email || ""}
          required
        />
        {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          name="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {passwordMismatch && <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">NickName</Label>
        <Input id="name" name="name" placeholder="Enter your name" defaultValue={state?.values?.name || ""} required />
        {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
      </div>

      <ProfileImageUpload value={profileImage} onChange={setProfileImage} disabled={isPending} />

      <input
        ref={hiddenFileInputRef}
        name="profileImage"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        tabIndex={-1}
      />

      {state?.errors?.general && <p className="text-red-500 text-sm text-center">{state.errors.general}</p>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
