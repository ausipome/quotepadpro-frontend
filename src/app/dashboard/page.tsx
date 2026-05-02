"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/components/auth/AuthProvider";
import AppTopBar from "@/components/navigation/AppTopBar";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [authNotice, setAuthNotice] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const notice = sessionStorage.getItem("auth_notice");
    if (notice) {
      setAuthNotice(notice);
      sessionStorage.removeItem("auth_notice");
    }
  }, []);
  
    async function handleResendConfirmation() {
    if (!user?.email) return;

    setResendLoading(true);

    try {
      const res = await apiFetch<{ message: string }>("/auth/resend-confirmation", {
        method: "POST",
        body: { email: user.email },
      });

      setAuthNotice(res.message);
    } catch (error) {
      setAuthNotice(
        error instanceof Error ? error.message : "Failed to resend confirmation email."
      );
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <RequireAuth>
      <main className="min-h-screen bg-white">
        <AppTopBar />
        <div className="mx-auto max-w-[1080px] px-6 py-8">
          <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-600">
                QuotePadPro
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Welcome back{user?.name ? `, ${user.name}` : ""}.
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage your customers and create polished quotes quickly.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/account/quotes"
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Go to Quotes
              </Link>

              <Link
                href="/account/address-book"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Address Book
              </Link>

              <Link
                href="/account/profile"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </div>

          {user && !user.emailVerified ? (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  {authNotice || "Your email address has not been confirmed yet. Please check your inbox before sending quotes."}
                </div>

                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={resendLoading}
                  className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Resend confirmation email"}
                </button>
              </div>
            </div>
          ) : authNotice ? (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {authNotice}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/account/quotes"
              className="rounded-[28px] border border-slate-200 p-6 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-3 text-sm font-medium text-emerald-600">
                Quotes
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Build and manage quotes
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Create new quotes, edit saved ones, and open public quote links.
              </p>
            </Link>

            <Link
              href="/account/address-book"
              className="rounded-[28px] border border-slate-200 p-6 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-3 text-sm font-medium text-emerald-600">
                Address Book
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Manage your customers
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Add, edit and organise customers ready to use in your quotes.
              </p>
            </Link>

            <Link
              href="/account/profile"
              className="rounded-[28px] border border-slate-200 p-6 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-3 text-sm font-medium text-emerald-600">
                Profile
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Set business details
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Update the business name, logo and contact details shown on quotes.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}