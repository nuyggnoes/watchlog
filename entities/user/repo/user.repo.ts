import { createClient } from "@/shared/lib/supabase/serverClient";
import type { UserProfile } from "../model/types";

export class UserRepository {
  async findById(userId: string) {
    const supabase = await createClient();
    return supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
  }

  async create(userData: UserProfile) {
    const supabase = await createClient();
    return supabase.from("profiles").insert(userData);
  }
}
