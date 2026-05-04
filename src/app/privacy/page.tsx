export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
          <p>
            This Privacy Policy explains how QuotePadPro collects, uses and protects information when you use our website and quoting platform.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Who we are</h2>
            <p className="mt-2">
              QuotePadPro provides online quoting software for small businesses, trades and service providers.
            </p>
            <p className="mt-2">
              Contact: hello@quotepadpro.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Information we collect</h2>
            <p className="mt-2">We may collect and process:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Account details such as your name and email address.</li>
              <li>Business details such as trading name, address, logo and contact information.</li>
              <li>Customer records you add to your address book.</li>
              <li>Quote content including line items, notes, pricing and VAT details.</li>
              <li>Subscription and billing status.</li>
              <li>Basic technical information such as browser, device and usage logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">How we use your information</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To create and manage your account.</li>
              <li>To provide quoting, customer management and quote acceptance features.</li>
              <li>To send account emails, quote emails and service notifications.</li>
              <li>To manage subscriptions, payments and billing status.</li>
              <li>To improve security, reliability and performance.</li>
              <li>To meet legal, tax and accounting obligations where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Payment information</h2>
            <p className="mt-2">
              Payments are handled by a third-party payment provider. QuotePadPro does not store full card details on its own servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Data storage and processors</h2>
            <p className="mt-2">
              We may use trusted third-party providers for hosting, database storage, email delivery, file storage and payment processing.
              These providers only process data as needed to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">How long we keep data</h2>
            <p className="mt-2">
              We keep account and quote data while your account is active. If you cancel or request deletion, we will delete or anonymise personal data where possible, unless we need to retain certain records for legal, tax, fraud prevention or legitimate business reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
            <p className="mt-2">
              Depending on your location, you may have rights to access, correct, delete, restrict or object to the use of your personal data.
              To make a request, contact hello@quotepadpro.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Changes to this policy</h2>
            <p className="mt-2">
              We may update this policy from time to time. The latest version will always be shown on this page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}