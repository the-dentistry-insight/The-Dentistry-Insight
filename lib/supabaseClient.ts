import { createClient } from "@supabase/supabase-js";

// Member-facing browser client. Kept entirely separate from
// lib/supabase-session.ts, which is the server/cookie-based client used
// only by the /admin panel — the two auth systems must never share code
// paths, session storage, or cookies.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
