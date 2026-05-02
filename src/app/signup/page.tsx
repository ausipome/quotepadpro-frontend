"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { AuthResponse } from "@/types";
import { useAuth } from "@/components/auth/AuthProvider";
import AppTopBar from "@/components/navigation/AppTopBar";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch<AuthResponse>("/auth/signup", {
        method: "POST",
        body: { name, email, password },
      });

      login(res);
      sessionStorage.setItem(
        "auth_notice",
        "Account created successfully. Please check your email to confirm your address, then start your 30 day free trial."
      );
      router.push("/checkout");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AppTopBar showAuthLinks />
      <div className="flex min-h-[calc(100vh-81px)] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Start creating quotes in minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
      </div>
    </main>
  );
}