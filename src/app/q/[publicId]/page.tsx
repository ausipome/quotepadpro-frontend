import { API_BASE } from "@/lib/api";
import { PublicQuoteResponse } from "@/types";
import AcceptQuoteButton from "./AcceptQuoteButton";

async function getQuote(publicId: string): Promise<PublicQuoteResponse | null> {
  const res = await fetch(`${API_BASE}/public/quotes/${publicId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

function formatMoney(value: number) {
  return `£${value.toFixed(2)}`;
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const data = await getQuote(publicId);

  if (!data) {
    return (
      <main className="min-h-screen bg-white px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl border p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Quote not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            This quote may have been removed or the link may be incorrect.
          </p>
        </div>
      </main>
    );
  }

  const { quote, owner, isExpired } = data;

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-[1180px] rounded-[28px] border border-emerald-100 bg-white p-8 shadow-sm lg:px-12">
        {isExpired && quote.status !== "accepted" ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            This quote expired on {formatDate(quote.expiryDate)} and can no longer be accepted online.
          </div>
        ) : null}

        <div className="mb-8 flex flex-col gap-8 border-b pb-8 md:flex-row md:justify-between">
          <div>
            <div className="text-3xl font-semibold tracking-tight text-emerald-700">
              {quote.title || "Quote"}
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">Quote Number:</span>{" "}
                {quote.quoteNumber}
              </div>
              <div>
                <span className="font-medium text-gray-900">Created:</span>{" "}
                {formatDate(quote.quoteDate)}
              </div>
              <div>
                <span className="font-medium text-gray-900">Expiry Date:</span>{" "}
                {formatDate(quote.expiryDate)}
              </div>
              <div>
                <span className="font-medium text-gray-900">Status:</span>{" "}
                <span className="capitalize">{quote.status}</span>
              </div>
              {quote.acceptedAt ? (
                <div>
                  <span className="font-medium text-gray-900">Accepted:</span>{" "}
                  {formatDate(quote.acceptedAt)}
                </div>
              ) : null}
            </div>
          </div>

          <div className="text-sm text-gray-600 md:text-right">
            {owner.logoUrl ? (
              <div className="mb-3 flex justify-start md:justify-end">
                <img
                  src={owner.logoUrl}
                  alt="Business logo"
                  className="max-h-14 max-w-[180px] object-contain"
                />
              </div>
            ) : null}

            <div className="font-medium text-gray-900">
              {owner.businessName || owner.name}
            </div>
            {owner.businessAddress ? (
              <div className="whitespace-pre-wrap">{owner.businessAddress}</div>
            ) : null}
            {owner.phone ? <div>{owner.phone}</div> : null}
            {owner.email ? <div>{owner.email}</div> : null}
          </div>
        </div>

        <div className="mb-8 grid gap-8 border-b pb-8 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Customer
            </div>
            {quote.contact ? (
              <div className="space-y-1 text-sm text-gray-700">
                <div className="font-semibold text-gray-900">
                  {quote.contact.name}
                </div>
                {quote.contact.company ? <div>{quote.contact.company}</div> : null}
                {quote.contact.email ? <div>{quote.contact.email}</div> : null}
                {quote.contact.phone ? <div>{quote.contact.phone}</div> : null}
                {[quote.contact.address1, quote.contact.address2, quote.contact.city, quote.contact.county, quote.contact.postcode]
                  .filter(Boolean)
                  .length > 0 ? (
                  <div className="pt-1 text-gray-600">
                    {[quote.contact.address1, quote.contact.address2, quote.contact.city, quote.contact.county, quote.contact.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No customer details.</div>
            )}
          </div>

          <div className="md:justify-self-end">
            <AcceptQuoteButton
              publicId={publicId}
              initialStatus={quote.status}
              isExpired={isExpired}
            />
          </div>
        </div>

        <div className="mb-8 overflow-x-auto rounded-2xl border">
  <div className="min-w-[760px]">
    <div className="grid grid-cols-[1.2fr_2fr_0.45fr_0.7fr_0.7fr] gap-3 border-b bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
      <div>Item</div>
      <div>Description</div>
      <div className="text-right">Qty</div>
      <div className="text-right">Price</div>
      <div className="text-right">Total</div>
    </div>

    <div className="divide-y">
      {(quote.items || []).map((item) => (
        <div
          key={item.id ?? `${item.name}-${item.sortOrder}`}
          className="grid grid-cols-[1.2fr_2fr_0.45fr_0.7fr_0.7fr] gap-3 px-4 py-3 text-sm"
        >
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-gray-600">{item.description}</div>
          <div className="text-right">{item.quantity}</div>
          <div className="text-right whitespace-nowrap">
            {formatMoney(item.unitPrice)}
          </div>
          <div className="text-right font-medium whitespace-nowrap">
            {formatMoney(item.lineTotal)}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {quote.notes ? (
          <div className="mb-8 rounded-2xl border p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Notes
            </div>
            <p className="whitespace-pre-wrap text-sm text-gray-700">
              {quote.notes}
            </p>
          </div>
        ) : null}

        <div className="ml-auto max-w-sm rounded-2xl border border-emerald-100 bg-slate-50 p-5">
          <div className="mb-4 text-lg font-semibold">Summary</div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatMoney(quote.subtotal)}</span>
            </div>
            {quote.discountValue > 0 ? (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-{formatMoney(quote.discountValue)}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>VAT</span>
              <span>{formatMoney(quote.vatAmount)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-emerald-100 pt-3 text-lg font-semibold text-emerald-700">
              <span>Total</span>
              <span>{formatMoney(quote.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
