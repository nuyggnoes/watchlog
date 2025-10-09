import { UserRepository } from "@/entities/user/repo/user.repo";
import { ProfileUser } from "../model/types";

export class ProfileService {
  private userRepo = new UserRepository();

  async getProfileById(userId: string) {
    const { data: profile, error } = await this.userRepo.findById(userId);
    console.log("profile service", profile);

    if (error || !profile) {
      return { success: false, error: "프로필을 찾을 수 없습니다." };
    }
    const profileUser: ProfileUser = {
      id: userId,
      email: profile.email,
      name: profile.name || undefined,
      profileImageUrl: profile.profile_image_url || undefined,
    };
    return { success: true, data: profileUser };
  }
}
