import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Review {
  id: string
  author: string
  avatarUrl: string
  rating: number
  content: string
  date: string
  likes: number
  replies: number
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={review.avatarUrl || "/placeholder.svg"} alt={review.author} />
          <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{review.author}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-2 text-sm">{review.content}</p>

          <div className="flex items-center gap-4 mt-3">
            <Button variant="ghost" size="sm" className="gap-1 h-8">
              <ThumbsUp className="h-4 w-4" />
              <span>{review.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 h-8">
              <MessageSquare className="h-4 w-4" />
              <span>{review.replies}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
