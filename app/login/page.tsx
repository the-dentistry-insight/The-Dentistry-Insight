"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Returning members use password login — no OTP after the first signup.
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-9">
        <div className="text-center mb-6">
          <i className="fa-solid fa-tooth text-4xl text-adaBlue" />
          <h1 className="text-lg font-black text-slate-900 mt-3">Member Login</h1>
          <p className="text-xs text-slate-400 mt-1">Welcome back — log in with your email and password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-adaNavy hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-sm rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">New here? <Link href="/signup" className="text-adaBlue font-bold hover:underline">Create an account</Link></p>
        <p className="text-center mt-3"><Link href="/" className="text-xs text-slate-400 hover:text-adaBlue">← Continue without an account</Link></p>
      </div>
    </div>
  );
}
