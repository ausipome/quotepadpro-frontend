export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <p>
            QuotePadPro collects the information needed to provide your account,
            manage customers, create quotes and deliver the service.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Information we collect</h2>
          <p>
            This may include your name, email address, business details, customer
            records, quote content, logo uploads and payment subscription status.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">How we use information</h2>
          <p>
            We use this information to provide the app, send account emails,
            process subscriptions, improve the service and comply with legal obligations.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Third-party services</h2>
          <p>
            We may use trusted providers such as hosting, email delivery, storage
            and payment processing services to operate QuotePadPro.
          </p>

          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p>
            For privacy questions, contact: hello@quotepadpro.com
          </p>
        </div>
      </div>
    </main>
  );
}