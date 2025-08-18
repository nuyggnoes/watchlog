'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';

export function useRequireAuth() {
  const router = useRouter();
  const supabase = createClient();

  return async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push(`/login`);
      return null;
    }
    return session;
  }
}
