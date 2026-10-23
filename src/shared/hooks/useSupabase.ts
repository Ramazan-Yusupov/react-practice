import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Не заданы VITE_SUPABASE_URL или VITE_SUPABASE_ANON_KEY в .env');
}

export function useSupabase() {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  return useMemo(() => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      accessToken: async () => {
        if (!isLoaded || !isSignedIn) {
          return null;
        }

        // Новая интеграция Clerk + Supabase:
        // используем обычный токен сессии, без JWT template.
        return await getToken();
      },
    });
  }, [getToken, isSignedIn, isLoaded]);
}
