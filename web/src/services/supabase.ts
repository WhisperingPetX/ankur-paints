import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

/**
 * Ankur Paints Management Web Dashboard — Supabase Client Setup
 * Configured for Vite / React using import.meta.env
 */

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  process.env.VITE_SUPABASE_URL ||
  'https://placeholder.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'placeholder-anon-key';

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
