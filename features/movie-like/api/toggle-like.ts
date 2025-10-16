"use server";

import { requireUser } from "@/features/auth/services/session";
import { LikeRepository } from "@/entities/like/repo/like.repo";
import { revalidatePath } from "next/cache";

export async function toggleLike(movieId: string) {
  const user = await requireUser();

  const repo = new LikeRepository();
  const movieIdNumber = Number(movieId);
  console.log("Toggling like for movieId:", movieId, "by user:", user.id);

  const { data: existing } = await repo.findByUserIdAndMovieId(user.id, movieIdNumber);

  let isLiked: boolean;

  if (existing) {
    await repo.delete(user.id, movieIdNumber);
    isLiked = false;
  } else {
    await repo.create({
      user_id: user.id,
      movie_id: movieIdNumber,
    });
    isLiked = true;
  }

  revalidatePath("/");
  revalidatePath(`/movies/${movieId}`);

  return { isLiked };
}
