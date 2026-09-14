"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: verifyError } = await supabaseClient.auth.verifyOtp({
      email,
      token,
      type: "signup",
    });

    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    router.push("/dashboard");
  }

  async function handleResend() {
    setResending(true);
    setResendMsg("");
    const { error: resendError } = await supabaseClient.auth.resend({
      type: "signup",
      email,
    });
    setResending(false);
    setResendMsg(resendError ? resendError.message : "New code sent.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-adaSoftBlue to-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-9">
        <div className="text-center mb-6">
          <i className="fa-solid fa-tooth text-4xl text-adaBlue" />
          <h1 className="text-lg font-black text-slate-900 mt-3">Enter your code</h1>
          <p className="text-xs text-slate-400 mt-1">Sent to <span className="font-bold text-slate-600">{email || "your email"}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">6-digit code</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="000000"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-2xl tracking-[0.5em] text-center outline-none focus:border-adaBlue transition"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          {resendMsg && (
            <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">{resendMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-adaNavy hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-sm rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">Didn&apos;t get it? <button onClick={handleResend} disabled={resending} className="text-adaBlue font-bold hover:underline disabled:opacity-60">{resending ? "Sending…" : "Resend code"}</button></p>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
}
