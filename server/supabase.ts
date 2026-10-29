import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types.ts';
import { env } from './env.ts';

// Secret key обходит RLS, поэтому используется ТОЛЬКО на сервере.
export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
