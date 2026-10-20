import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

/**
 * Ankur Paints Retailer Mobile App — Supabase Client Setup
 * Configured for React Native / Expo with resilient token storage.
 */

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl.includes('placeholder') && process.env.NODE_ENV !== 'test') {
  console.info(
    '[Ankur Paints] Supabase is initialized in offline/placeholder mode. ' +
    'To connect to your cloud database, set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in mobile/.env'
  );
}

// Resilient Storage Adapter (Compatible with AsyncStorage / Expo SecureStore / Memory)
const createMemoryStorage = () => {
  const store = new Map<string, string>();
  return {
    getItem: async (key: string): Promise<string | null> => {
      return store.get(key) ?? null;
    },
    setItem: async (key: string, value: string): Promise<void> => {
      store.set(key, value);
    },
    removeItem: async (key: string): Promise<void> => {
      store.delete(key);
    },
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createMemoryStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
