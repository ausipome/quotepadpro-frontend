export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <p>
            QuotePadPro uses essential cookies or local storage where needed to
            keep the app working, such as remembering login state and cookie preferences.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Essential cookies</h2>
          <p>
            These are needed for the website and app to function properly.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Analytics or marketing cookies</h2>
          <p>
            If we add analytics or marketing tools in future, we will ask for your
            consent before using non-essential cookies.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Managing cookies</h2>
          <p>
            You can change your browser settings to block or delete cookies.
          </p>
        </div>
      </div>
    </main>
  );
}
