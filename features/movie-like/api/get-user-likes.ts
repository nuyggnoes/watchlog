import { LikeRepository } from "@/entities/like/repo/like.repo";

export async function getUserLikes(userId: string): Promise<Set<string>> {
  const repo = new LikeRepository();
  const { data } = await repo.findByUserId(userId);
  const movieIds = data?.map((like) => String(like.movie_id)) ?? [];

  return new Set(movieIds);
}
