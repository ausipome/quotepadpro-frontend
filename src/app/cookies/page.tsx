export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
          <p>
            This Cookie Policy explains how QuotePadPro uses cookies and similar technologies.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">What are cookies?</h2>
            <p className="mt-2">
              Cookies are small files stored on your device. They help websites remember information such as login status, preferences and settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Essential cookies</h2>
            <p className="mt-2">
              Essential cookies are needed for QuotePadPro to work properly. These may be used for login sessions, security, checkout, subscription access and remembering your cookie choice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Optional cookies</h2>
            <p className="mt-2">
              Optional cookies may be used for analytics, performance monitoring or marketing. We will only use optional cookies where consent is required and has been given.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Third-party services</h2>
            <p className="mt-2">
              Some cookies or similar technologies may be set by third-party services used to provide payments, hosting, analytics or security features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Managing cookies</h2>
            <p className="mt-2">
              You can accept or reject optional cookies using the cookie banner where available. You can also block or delete cookies through your browser settings, although some features may stop working correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Changes to this policy</h2>
            <p className="mt-2">
              We may update this Cookie Policy as the service develops or as our use of cookies changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For questions about cookies, contact hello@quotepadpro.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}