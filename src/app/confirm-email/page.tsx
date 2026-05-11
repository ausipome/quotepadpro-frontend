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

  const isSuccess = state === "success";
  const isLoading = state === "loading";
  const isError = state === "error";

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="bg-gradient-to-r from-emerald-600 to-sky-600 px-8 py-10 text-white">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
              {isSuccess ? "✓" : isError ? "!" : "…"}
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {isSuccess
                ? "Email confirmed!"
                : isError
                ? "Something went wrong"
                : "Confirming your email"}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/90">
              {isSuccess
                ? "You’re all set. Now let’s make sure your QuotePad account is ready to create smart, branded, professional-looking quotes."
                : message}
            </p>
          </div>

          <div className="px-8 py-8">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
                <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
              </div>
            ) : null}

            {isSuccess ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-3 text-2xl">🏢</div>
                    <h2 className="font-semibold text-slate-900">
                      Add your business details
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Fill in your profile so your company name, contact details,
                      address and business info appear correctly on your quotes.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-3 text-2xl">✨</div>
                    <h2 className="font-semibold text-slate-900">
                      Upload your logo
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Add your logo to give every quote a polished, branded look
                      that feels professional and proper.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm leading-6 text-emerald-900">
                    A completed profile helps you get the best out of QuotePad —
                    your quotes will look sharper, feel more trustworthy, and
                    give customers a better first impression.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Go to Login
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </>
            ) : null}

            {isError ? (
              <div>
                <p className="text-sm leading-6 text-slate-600">{message}</p>

                <div className="mt-6">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-10">
          <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
            <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
              <h1 className="text-2xl font-semibold text-slate-900">
                Confirming your email
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Just checking everything over...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}