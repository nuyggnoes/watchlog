"use client";

import { HTTP_METHOD } from "@/app/api/constants";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/utils/api";
import { useUserState } from "@/stores/userStore";
import { Settings, Star, Heart } from "lucide-react";

interface ProfileHeaderProps {
  profileUser: ProfileUser;
  liked: number;
}

export function ProfileHeader({ profileUser, liked }: ProfileHeaderProps) {
  const logout = useUserState((s) => s.logout);

  const handleLogout = async () => {
    await apiRequest(API_ENDPOINTS.USER_LOGOUT, {
      method: HTTP_METHOD.POST,
    });
    logout();
    window.location.replace("/");
  };
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="w-24 h-24 border-4 border-background">
        <AvatarImage src={profileUser.profileImageUrl || undefined} alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold">{profileUser.name}</h1>
        <p className="text-muted-foreground">{profileUser.email}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{liked}</p>
              <p className="text-xs text-muted-foreground">Liked</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">0</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" className="gap-2">
        <Settings className="h-4 w-4" />
        Edit Profile
      </Button>
      <Button variant="destructive" size="sm" className="gap-2" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
}
