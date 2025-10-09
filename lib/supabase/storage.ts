import { createClient } from "./serverClient";

export class SupabaseStorage {
  private static instance: SupabaseStorage;

  static getInstance(): SupabaseStorage {
    if (!SupabaseStorage.instance) {
      SupabaseStorage.instance = new SupabaseStorage();
    }
    return SupabaseStorage.instance;
  }

  async uploadProfileImage(
    userId: string,
    file: File,
    supabaseClient?: any
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const supabase = supabaseClient || (await createClient());

      // 현재 인증된 사용자 확인
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.log("User auth error:", userError);
      }

      // 파일 확장자 추출
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      // 파일 업로드
      const { data, error } = await supabase.storage.from("profiles").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // 공개 URL 가져오기
      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (error) {
      return { success: false, error: "Failed to upload profile image" };
    }
  }

  async deleteProfileImage(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = await createClient();

      const urlParts = url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `profiles/${fileName}`;

      const { error } = await supabase.storage.from("profiles").remove([filePath]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete profile image" };
    }
  }
}
