import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} QuotePadPro. All rights reserved.
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/login" className="hover:text-slate-900">Login</Link>
          <Link href="/signup" className="hover:text-slate-900">Signup</Link>
          <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-slate-900">Cookie Policy</Link>
        </nav>
      </div>
    </footer>
  );
}