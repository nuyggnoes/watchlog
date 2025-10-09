"use client";

import { createClient } from "@/shared/lib/supabase/browserClient";
import { useState } from "react";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  console.log("useLogout refactor");

  const logout = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
