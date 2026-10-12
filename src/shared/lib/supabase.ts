// src/shared/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Храним функцию получения токена
type TokenGetter = (options?: { template?: string }) => Promise<string | null>;

let tokenGetter: TokenGetter | null = null;

export function setTokenGetter(getter: TokenGetter) {
  tokenGetter = getter;
}

export async function getSupabaseWithAuth() {
  if (!tokenGetter) return supabase;

  const token = await tokenGetter({ template: 'supabase' });
  if (!token) return supabase;

  // Создаем клиент с токеном для этого конкретного запроса
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
