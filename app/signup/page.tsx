"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // signUp (not signInWithOtp) because a password is being set here.
    // Supabase sends a 6-digit confirmation code via the "Confirm signup"
    // email template (must be configured to show {{ .Token }} in the
    // Supabase dashboard, same as was done earlier for the Magic Link
    // template — these are two separate templates).
    const { error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          qualification,
          country,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-adaSoftBlue to-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-9">
        <div className="text-center mb-6">
          <i className="fa-solid fa-tooth text-4xl text-adaBlue" />
          <h1 className="text-lg font-black text-slate-900 mt-3">Create your account</h1>
          <p className="text-xs text-slate-400 mt-1">We&apos;ll email you a 6-digit code to confirm it&apos;s you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Dr. Your Name"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Qualification</label>
            <select
              required
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition bg-white"
            >
              <option value="" disabled>
                Select qualification
              </option>
              <option value="Dentist">Dentist</option>
              <option value="Dental Student">Dental Student</option>
              <option value="Dental Hygienist">Dental Hygienist</option>
              <option value="Dental Nurse">Dental Nurse</option>
              <option value="Dental Technician">Dental Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Country</label>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-adaBlue transition bg-white"
            >
              <option value="" disabled>
                Select country
              </option>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
              <option value="Indonesia">Indonesia</option>
              <option value="UAE">UAE</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Australia">Australia</option>
              <option value="Qatar">Qatar</option>
              <option value="UK">UK</option>
              <option value="Other">Other</option>
            </select>
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
              "Continue →"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <Link href="/login" className="text-adaBlue font-bold hover:underline">Log in</Link></p>
        <p className="text-center mt-3"><Link href="/" className="text-xs text-slate-400 hover:text-adaBlue">← Continue without an account</Link></p>
      </div>
    </div>
  );
}
