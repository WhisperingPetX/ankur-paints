import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

/**
 * Ankur Paints Management Web Dashboard — Supabase Client Setup
 * Configured for Vite / React using import.meta.env
 */

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://wpiztkjuojirzsxvzqfv.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_Q6HJga6oLAtAVKMnhKWYyg_PIpljA-W';

if (supabaseUrl.includes('placeholder') && process.env.NODE_ENV !== 'test') {
  console.info(
    '[Ankur Paints Admin] Supabase initialized in offline/placeholder mode. ' +
    'Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in web/.env'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
