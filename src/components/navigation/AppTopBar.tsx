"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_URL } from "@/lib/branding";
import { useAuth } from "@/components/auth/AuthProvider";

type AppTopBarProps = {
  showAuthLinks?: boolean;
};

export default function AppTopBar({ showAuthLinks = false }: AppTopBarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
          <Image
            src={BRAND_LOGO_URL}
            alt="QuotePadPro logo"
            width={200}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {user ? (
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="hidden rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 sm:inline-flex">
              Dashboard
            </Link>
            <Link href="/account/quotes" className="hidden rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 sm:inline-flex">
              Quotes
            </Link>
            <Link href="/account/profile" className="hidden rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 md:inline-flex">
              Profile
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          </nav>
        ) : showAuthLinks ? (
          <div className="flex items-center gap-2 text-sm">
            <Link href="/login" className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50">
              Login
            </Link>
            <Link href="/signup" className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
              Start free trial
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
