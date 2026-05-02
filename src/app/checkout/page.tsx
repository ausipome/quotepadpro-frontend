"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RequireAuth } from "@/components/auth/RequireAuth";
import AppTopBar from "@/components/navigation/AppTopBar";
import { apiFetch } from "@/lib/api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const fetchClientSecret = useCallback(async () => {
    const res = await apiFetch<{ clientSecret: string }>("/billing/create-checkout-session", {
      method: "POST",
    });
    return res.clientSecret;
  }, []);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <RequireAuth>
      <main className="min-h-screen bg-slate-50">
        <AppTopBar />
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-14">
          <section className="rounded-[32px] bg-emerald-600 p-8 text-white shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
              Start your trial
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              QuotePadPro Launch Plan
            </h1>
            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Get full access for 30 days, then continue for £5/month. Add customers, create polished quotes, send quote links and let customers accept online.
            </p>

            <div className="mt-8 rounded-[28px] bg-white p-6 text-slate-900">
              <div className="text-sm font-medium text-slate-500">Launch plan</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-semibold">£5</span>
                <span className="pb-1 text-sm text-slate-500">/ month after trial</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">30 day free trial. Cancel anytime from Stripe billing.</p>
            </div>

            <Link href="/dashboard" className="mt-6 inline-flex text-sm font-medium text-emerald-50 underline underline-offset-4">
              Back to dashboard
            </Link>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Secure payment details</h2>
              <p className="mt-1 text-sm text-slate-500">Your subscription unlocks when Stripe confirms the checkout session.</p>
            </div>

            <div className="min-h-[520px]">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
