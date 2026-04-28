"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Quote } from "@/types";

type Props = {
  onNewQuoteClick: () => void;
  onOpenQuote: (quote: Quote) => void;
};

function statusClasses(status: string) {
  switch (status) {
    case "accepted":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "sent":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    default:
      return "bg-slate-50 text-slate-600 border border-slate-200";
  }
}

export default function QuoteList({ onNewQuoteClick, onOpenQuote }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ quotes: Quote[] }>("/quotes")
      .then((res) => setQuotes(res.quotes))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[980px]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Quotes</h1>
          <p className="text-sm text-slate-500">
            Create, open and manage your saved quotes.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>

          <Link
            href="/account/address-book"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Address Book
          </Link>

          <button
            type="button"
            onClick={onNewQuoteClick}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            + New Quote
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          Loading quotes...
        </div>
      ) : quotes.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
          No quotes yet.
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <button
              key={quote.id}
              type="button"
              onClick={() => onOpenQuote(quote)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-1 text-lg font-semibold text-slate-900">
                    {quote.quoteNumber || `Quote #${quote.id}`}
                  </div>
                  <div className="text-sm text-slate-500">
                    {quote.contact?.name || "No customer"} • {quote.title}
                  </div>
                </div>

                <div className="flex items-center gap-3 md:flex-col md:items-end">
                  <div className="font-semibold text-slate-900">
                    £{quote.total.toFixed(2)}
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses(
                      quote.status
                    )}`}
                  >
                    {quote.status}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}