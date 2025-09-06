import { createClient } from "@/shared/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function getSessionStatus(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> {
  const user = await getCurrentUser();
  return {
    isAuthenticated: !!user,
    user,
  };
}
