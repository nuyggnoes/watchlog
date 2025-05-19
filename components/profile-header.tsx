import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Film, Star } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="w-24 h-24 border-4 border-background">
        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-muted-foreground">@johndoe</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">127</p>
              <p className="text-xs text-muted-foreground">Watched</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">84</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" className="gap-2">
        <Settings className="h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  )
}
