"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { ReviewCard } from "@/components/review-card"

interface ReviewSectionProps {
  movieId: string
}

export function ReviewSection({ movieId }: ReviewSectionProps) {
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)

  // This would normally fetch data from an API
  // For demo purposes, we'll use mock data
  const reviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 9,
      content:
        "Absolutely stunning visually and narratively. Denis Villeneuve has crafted a sci-fi masterpiece that honors the source material while creating something uniquely cinematic. The performances, especially from Chalamet and Zendaya, are captivating.",
      date: "2024-03-05",
      likes: 42,
      replies: 3,
    },
    {
      id: "2",
      author: "Michael Chen",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 8,
      content:
        "A worthy sequel that expands on the world-building of the first film. The pacing is much better, and the action sequences are breathtaking. Hans Zimmer's score is once again phenomenal.",
      date: "2024-03-02",
      likes: 28,
      replies: 1,
    },
    {
      id: "3",
      author: "Emma Wilson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      rating: 7,
      content:
        "While visually impressive, I found some of the character motivations a bit unclear if you haven't read the books. Still, it's a remarkable achievement in filmmaking and definitely worth watching on the big screen.",
      date: "2024-02-28",
      likes: 15,
      replies: 2,
    },
  ]

  const handleSubmitReview = () => {
    // This would normally send the review to an API
    console.log({ movieId, rating, reviewText })
    setReviewText("")
    setRating(0)
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>

      {/* Write a review */}
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Write a review</p>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="p-0.5">
                  <Star className={`h-4 w-4 ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Share your thoughts on this movie..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmitReview} disabled={!reviewText.trim() || rating === 0}>
            Post Review
          </Button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
