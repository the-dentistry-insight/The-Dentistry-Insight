"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading your account…</p>
      </div>
    );
  }

  const meta = user?.user_metadata || {};

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-adaNavy px-6 py-4 flex items-center justify-between">
        <img src="/logo.png" alt="The Dentistry Insight" className="h-9 w-auto" />
        <Link href="/" className="text-xs font-bold text-white/85 hover:text-white">← Back to site</Link>
      </div>

      <div className="max-w-md mx-auto mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-9 text-center">
          <div className="w-14 h-14 rounded-full bg-adaSoftBlue text-adaBlue flex items-center justify-center text-xl mx-auto mb-4">
            <i className="fa-solid fa-user" />
          </div>
          <h1 className="text-lg font-black text-slate-900">{meta.full_name || "You're logged in"}</h1>
          <p className="text-sm text-slate-500 mt-1">{user?.email}</p>

          {(meta.qualification || meta.country) && (
            <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-3">
              {meta.qualification && (
                <div className="flex justify-between text-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Qualification</span>
                  <span className="font-semibold text-slate-800">{meta.qualification}</span>
                </div>
              )}
              {meta.country && (
                <div className="flex justify-between text-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Country</span>
                  <span className="font-semibold text-slate-800">{meta.country}</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-8 px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm rounded-lg transition"
          >
            <i className="fa-solid fa-right-from-bracket" />&nbsp; Log out
          </button>
        </div>
      </div>
    </div>
  );
}
