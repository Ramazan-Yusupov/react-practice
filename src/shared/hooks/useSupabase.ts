import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export function useSupabase() {
  const { getToken, isSignedIn } = useAuth();

  return useMemo(() => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: async (url, options = {}) => {
          // Получаем Clerk session token с шаблоном supabase
          const token = isSignedIn ? await getToken({ template: 'supabase' }) : null;

          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });
        },
      },
    });
  }, [getToken, isSignedIn]);
}
