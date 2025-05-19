import { ProfileHeader } from "@/components/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieGrid } from "@/components/movie-grid"
import { ReviewList } from "@/components/review-list"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <ProfileHeader />

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="liked">Liked Movies</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-6">
          <ReviewList isUserReviews />
        </TabsContent>
        <TabsContent value="liked" className="mt-6">
          <MovieGrid filter="liked" />
        </TabsContent>
        <TabsContent value="watchlist" className="mt-6">
          <MovieGrid filter="watchlist" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
