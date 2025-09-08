import { createClient } from "@/shared/lib/supabase/serverClient";
import type { UserProfile } from "../model/types";

export class UserRepository {
  async findById(userId: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
  }

  async findByEmail(email: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("email", email).maybeSingle();
  }

  async findByName(name: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("name", name).maybeSingle();
  }

  async create(userData: Omit<UserProfile, "id" | "created_at" | "updated_at">) {
    const supabase = await createClient();
    return supabase.from("profiles").insert(userData);
  }
}
