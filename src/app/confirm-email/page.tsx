"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );

  const [message, setMessage] = useState(
    token ? "Confirming your email..." : "Missing confirmation token."
  );

  useEffect(() => {
    if (!token) return;

    fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
      }/auth/confirm-email?token=${encodeURIComponent(token)}`,
      { cache: "no-store" }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to confirm email");
        }

        setState("success");
        setMessage("Your email has been confirmed.");
      })
      .catch((err) => {
        setState("error");
        setMessage(
          err instanceof Error ? err.message : "Failed to confirm email."
        );
      });
  }, [token]);

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Confirm Email</h1>
        <p className="mt-3 text-sm text-slate-600">{message}</p>

        {state !== "loading" ? (
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Go to Login
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-10">
          <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">
              Confirm Email
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Confirming your email...
            </p>
          </div>
        </main>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}