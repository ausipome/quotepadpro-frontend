"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SiteHeader from "@/components/marketing/SiteHeader";
import ExampleQuoteCard from "@/components/marketing/ExampleQuoteCard";
import SiteFooter from "@/components/marketing/SiteFooter";

function FeatureCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "emerald" | "blue" | "amber" | "rose";
}) {
  const tones = {
    emerald: "bg-emerald-600 text-white",
    blue: "bg-sky-500 text-white",
    amber: "bg-amber-400 text-slate-900",
    rose: "bg-rose-500 text-white",
  };

  return (
    <div className={`rounded-[28px] p-6 shadow-sm ${tones[tone]}`}>
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-80">
        Feature
      </div>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 opacity-90">{body}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-6 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-16">
          <div className="pt-2 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                Simple quoting for trades and service businesses
              </div>

              <h1 className="max-w-[700px] text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                Create polished quotes that feel
                <span className="text-emerald-700"> premium</span>, not patched
                together.
              </h1>

              <p className="mt-6 max-w-[620px] text-lg leading-8 text-slate-600">
                QuotePadPro helps you manage customers, build professional quotes,
                send them in seconds and let customers accept online.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Start free trial
                </Link>
                <a
                  href="#example"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  See Example Quote
                </a>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-br from-emerald-100 via-sky-50 to-amber-50 blur-3xl" />
            <ExampleQuoteCard />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1180px] px-6 py-8 lg:py-12">
        <div className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Features
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Built to be fast, clean and genuinely usable
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            tone="emerald"
            title="Customer-first flow"
            body="Start from the address book, pick a customer, then build the quote. Fast and natural."
          />
          <FeatureCard
            tone="blue"
            title="Beautiful quote output"
            body="Your builder and your public quote feel consistent, modern and ready to send."
          />
          <FeatureCard
            tone="amber"
            title="Send and accept"
            body="Email a quote link to your customer and let them accept it online without hassle."
          />
          <FeatureCard
            tone="rose"
            title="Professional branding"
            body="Use your logo, business details and polished layouts so every quote looks intentional."
          />
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-[1180px] px-6 py-12 lg:py-16"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["1", "Add your customer", "Build your address book once and reuse contacts in every quote."],
            ["2", "Create the quote", "Add items, notes, VAT and discounts while the totals update automatically."],
            ["3", "Send and get accepted", "Email the quote and let the customer review and accept online."],
          ].map(([step, title, body]) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                {step}
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="example" className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-8 rounded-[32px] bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Example quote
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Clean, branded quotes your customers can accept online
            </h2>
            <p className="mt-3 max-w-[680px] text-sm leading-7 text-slate-600">
              The quote layout is designed to feel simple, professional and easy to approve — without making your customer fight through clutter.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </section>

      <section id="pricing" className="mx-auto max-w-[1180px] px-6 py-14 lg:py-20">
        <div className="rounded-[32px] bg-emerald-600 px-8 py-10 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                Pricing
              </div>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight">
                Simple pricing, no clutter
              </h2>
              <p className="mt-3 max-w-[620px] text-sm leading-7 text-emerald-50">
                Start with a 30 day free trial, then keep your quoting workflow polished for £5/month.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-6 text-slate-900">
              <div className="text-sm font-medium text-slate-500">Launch plan</div>
              <div className="mt-2 text-4xl font-semibold">£5/mo</div>
              <p className="mt-1 text-sm font-medium text-emerald-700">30 day free trial included</p>
              <p className="mt-2 text-sm text-slate-600">
                Clean quoting, customer management, quote emailing and public quote links.
              </p>
              <Link
                href="/signup"
                className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}