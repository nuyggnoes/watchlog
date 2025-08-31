import { ProfileHeader } from "@/components/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieGrid } from "@/components/movie-grid";
import { ReviewList } from "@/components/review-list";
import { createClient } from "@/lib/supabase/serverClient";
import { fetchMoviesByIds } from "@/lib/movie/movie";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, profile_image_url")
    .eq("user_id", user.id)
    .single();

  const profileUser: ProfileUser = {
    id: user.id,
    email: user.email!,
    name: profile?.name,
    profileImageUrl: profile?.profile_image_url,
  };

  const { data: likedMovies } = await supabase.from("movie_likes").select("movie_id").eq("user_id", user.id);
  const movieIds = likedMovies?.map((item) => item.movie_id) || [];

  const movies = await fetchMoviesByIds(movieIds);

  return (
    <div className="space-y-8">
      <ProfileHeader profileUser={profileUser} liked={movies.length} />

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="liked">Liked Movies</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-6">
          {/* <ReviewList isUserReviews /> */}
        </TabsContent>
        <TabsContent value="liked" className="mt-6">
          <MovieGrid movies={movies} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
