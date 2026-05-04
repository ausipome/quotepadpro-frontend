export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <p>
            These terms explain how you may use QuotePadPro.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Use of the service</h2>
          <p>
            You are responsible for the information you add to your account,
            including customer details, quote content and pricing.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Subscriptions</h2>
          <p>
            QuotePadPro is offered as a paid monthly subscription after any free
            trial period shown during signup.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
          <p>
            We aim to keep the service reliable, but we do not guarantee it will
            always be available without interruption.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p>
            For questions about these terms, contact: hello@quotepadpro.com
          </p>
        </div>
      </div>
    </main>
  );
}