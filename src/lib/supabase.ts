import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
} catch (err) {
  console.error('Failed to initialize Supabase client:', err);
}

export const supabase = supabaseInstance;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
  }
  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  return supabaseInstance !== null;
}
