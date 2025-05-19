import { ReviewCard } from "@/components/review-card"

interface ReviewListProps {
  isUserReviews?: boolean
}

export function ReviewList({ isUserReviews = false }: ReviewListProps) {
  // This would normally fetch data from an API
  // For demo purposes, we'll use mock data
  const reviews = [
    {
      id: "1",
      author: isUserReviews ? "You" : "John Doe",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 9,
      content:
        "Absolutely stunning visually and narratively. Denis Villeneuve has crafted a sci-fi masterpiece that honors the source material while creating something uniquely cinematic.",
      date: "2024-03-05",
      likes: 42,
      replies: 3,
      movieTitle: "Dune: Part Two",
    },
    {
      id: "2",
      author: isUserReviews ? "You" : "John Doe",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 8,
      content:
        "Christopher Nolan delivers another mind-bending masterpiece. The performances, especially from Cillian Murphy, are outstanding.",
      date: "2023-07-25",
      likes: 28,
      replies: 1,
      movieTitle: "Oppenheimer",
    },
    {
      id: "3",
      author: isUserReviews ? "You" : "John Doe",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 7,
      content:
        "While visually impressive, I found some of the character motivations a bit unclear. Still, it's a remarkable achievement in filmmaking.",
      date: "2023-12-15",
      likes: 15,
      replies: 2,
      movieTitle: "Poor Things",
    },
  ]

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="space-y-2">
          {isUserReviews && (
            <p className="text-sm font-medium">
              Your review for <span className="text-primary">{review.movieTitle}</span>
            </p>
          )}
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  )
}
