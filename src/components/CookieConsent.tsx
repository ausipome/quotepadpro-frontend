"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const COOKIE_NAME = "quotepadpro_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    Cookies.set(COOKIE_NAME, "accepted", { expires: 365, sameSite: "lax" });
    setVisible(false);
  }

  function reject() {
    Cookies.set(COOKIE_NAME, "rejected", { expires: 365, sameSite: "lax" });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Cookies</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            We use essential cookies to keep QuotePadPro working. We’ll only use
            optional analytics or marketing cookies if you accept them.
            {" "}
            <Link href="/cookies" className="font-medium text-emerald-700 hover:text-emerald-800">
              Read our cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}