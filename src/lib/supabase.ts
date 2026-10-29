import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * `null` when the env vars are missing. Unlike lo30 this does not throw: the public site
 * must keep working on localStorage alone, and sign-in drops to demo mode (see use-auth).
 * Components never use this directly; they go through src/lib/db/*.
 */
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null;

export const isSupabaseConfigured = supabase !== null;

export function requireSupabase() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}
