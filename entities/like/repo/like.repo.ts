import { createClient } from "@/shared/lib/supabase/serverClient";
import type { CreateLikeDto } from "../model/types";

export class LikeRepository {
  async findByUserId(userId: string) {
    const supabase = await createClient();
    return supabase.from("movie_likes").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  }

  async findByUserIdAndMovieId(userId: string, movieId: number) {
    const supabase = await createClient();
    return supabase.from("movie_likes").select("*").eq("user_id", userId).eq("movie_id", movieId).maybeSingle();
  }

  async create(like: CreateLikeDto) {
    const supabase = await createClient();
    return supabase.from("movie_likes").insert(like).select().single();
  }

  async delete(userId: string, movieId: number) {
    const supabase = await createClient();
    return supabase.from("movie_likes").delete().eq("user_id", userId).eq("movie_id", movieId);
  }
}
