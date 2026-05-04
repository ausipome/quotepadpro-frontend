export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
          <p>
            These Terms of Service set out the rules for using QuotePadPro. By creating an account or using the service, you agree to these terms.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">The service</h2>
            <p className="mt-2">
              QuotePadPro provides software for creating, managing, sending and accepting quotes online.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Accounts</h2>
            <p className="mt-2">
              You are responsible for keeping your login details secure and for all activity that happens under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Your content</h2>
            <p className="mt-2">
              You remain responsible for the information you add to QuotePadPro, including customer details, quote wording, pricing, VAT treatment and business information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Subscriptions and trials</h2>
            <p className="mt-2">
              QuotePadPro may offer a free trial followed by a paid monthly subscription. Pricing and trial details will be shown during signup.
              Unless cancelled, your subscription may continue automatically after the trial period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Cancellations</h2>
            <p className="mt-2">
              You can cancel your subscription in line with the cancellation options provided in the app or by contacting us.
              Access may continue until the end of the current billing period unless stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Acceptable use</h2>
            <p className="mt-2">You must not use QuotePadPro to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Break the law or infringe the rights of others.</li>
              <li>Upload malicious code or attempt to disrupt the service.</li>
              <li>Access another user’s account or data without permission.</li>
              <li>Send spam, misleading messages or unlawful content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
            <p className="mt-2">
              We aim to keep QuotePadPro reliable, but we cannot guarantee uninterrupted access. Maintenance, updates or third-party outages may affect availability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Limitation of liability</h2>
            <p className="mt-2">
              QuotePadPro is provided as business software. You are responsible for checking quotes before sending them and for ensuring your pricing, tax and contract terms are correct.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For questions about these terms, contact hello@quotepadpro.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}