"use client";

import { useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/components/auth/AuthProvider";
import { Contact, Quote } from "@/types";

type Props = {
  customer?: Contact;
  quoteData?: Quote;
  backButton?: React.ReactNode;
  onNewQuote?: () => void;
  onHomeClick?: () => void;
};

type ItemRow = {
  name: string;
  description: string;
  quantity: string;
  unitPrice: string;
};

function emptyItem(): ItemRow {
  return {
    name: "",
    description: "",
    quantity: "1",
    unitPrice: "0",
  };
}

function formatMoney(value: number) {
  return `£${value.toFixed(2)}`;
}

function formatDisplayDate(value?: string | null) {
  if (!value) return "Auto on save";
  const d = new Date(value);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toInputDate(value?: string | null) {
  return value ? value.slice(0, 10) : "";
}

export default function QuoteBuilder({
  customer,
  quoteData,
  backButton,
  onNewQuote,
  onHomeClick,
}: Props) {
  const { user } = useAuth();

  const [quoteId, setQuoteId] = useState<number | null>(quoteData?.id || null);
  const [publicId, setPublicId] = useState<string | null>(
    quoteData?.publicId || null
  );

  const [savedQuoteNumber, setSavedQuoteNumber] = useState(
    quoteData?.quoteNumber || ""
  );
  const [savedQuoteDate, setSavedQuoteDate] = useState<string | null>(
    quoteData?.quoteDate || null
  );

  const [title, setTitle] = useState(quoteData?.title || "Quote");
  const [status, setStatus] = useState(quoteData?.status || "draft");
  const [expiryDate, setExpiryDate] = useState(toInputDate(quoteData?.expiryDate));
  const [notes, setNotes] = useState(quoteData?.notes || "");

  const [vatMode, setVatMode] = useState(quoteData?.vatMode || "standard");
  const [vatRate, setVatRate] = useState<number>(quoteData?.vatRate || 20);
  const [discountType, setDiscountType] = useState(
    quoteData?.discountType || "fixed"
  );
  const [discountValue, setDiscountValue] = useState<number>(
    quoteData?.discountValue || 0
  );

  const [customerDetails] = useState<Contact | null>(
    quoteData?.contact || customer || null
  );

  const [items, setItems] = useState<ItemRow[]>(
    quoteData?.items?.length
      ? quoteData.items.map((item) => ({
          name: item.name || "",
          description: item.description || "",
          quantity: String(item.quantity ?? 1),
          unitPrice: String(item.unitPrice ?? 0),
        }))
      : [emptyItem()]
  );

  const [loadingAction, setLoadingAction] = useState<"save" | null>(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const displayQuoteNumber = savedQuoteNumber || "Auto on save";
  const displayQuoteDate = formatDisplayDate(savedQuoteDate);

  function handleItemChange(index: number, key: keyof ItemRow, value: string) {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return updated;
    });
  }

  function handleAddItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function handleRemoveItem(index: number) {
    setItems((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length ? updated : [emptyItem()];
    });
  }

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity || "0");
      const unitPrice = parseFloat(item.unitPrice || "0");
      return acc + quantity * unitPrice;
    }, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (discountType === "percent") {
      return subtotal * (discountValue / 100);
    }
    return discountValue;
  }, [subtotal, discountType, discountValue]);

  const discountedSubtotal = Math.max(subtotal - discountAmount, 0);

  const vatAmount = useMemo(() => {
    if (vatMode !== "standard") return 0;
    return discountedSubtotal * (vatRate / 100);
  }, [discountedSubtotal, vatMode, vatRate]);

  const total = discountedSubtotal + vatAmount;

  async function handleSave() {
    if (!customerDetails) {
      setMessage({ type: "error", text: "Please select a customer first." });
      return;
    }

    setLoadingAction("save");
    setMessage(null);

    const payload = {
      contactId: customerDetails.id,
      title,
      status,
      expiryDate: expiryDate || null,
      notes,
      subtotal,
      discountType,
      discountValue,
      vatMode,
      vatRate,
      vatAmount,
      total,
      items: items.map((item, index) => {
        const quantity = parseFloat(item.quantity || "0");
        const unitPrice = parseFloat(item.unitPrice || "0");
        return {
          name: item.name,
          description: item.description,
          quantity,
          unitPrice,
          lineTotal: quantity * unitPrice,
          sortOrder: index + 1,
        };
      }),
    };

    try {
      let saved: Quote;

      if (quoteId) {
        saved = await apiFetch<Quote>(`/quotes/${quoteId}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        saved = await apiFetch<Quote>("/quotes", {
          method: "POST",
          body: payload,
        });
      }

      setQuoteId(saved.id);
      setPublicId(saved.publicId);
      setSavedQuoteNumber(saved.quoteNumber);
      setSavedQuoteDate(saved.quoteDate);
      setTitle(saved.title);
      setStatus(saved.status);
      setExpiryDate(toInputDate(saved.expiryDate));
      setNotes(saved.notes);
      setVatMode(saved.vatMode);
      setVatRate(saved.vatRate);
      setDiscountType(saved.discountType);
      setDiscountValue(saved.discountValue);

      setMessage({ type: "success", text: "Quote saved successfully." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to save quote.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleSendQuote() {
    if (!quoteId) {
      setMessage({
        type: "error",
        text: "Save the quote before sending it.",
      });
      return;
    }

    setSending(true);
    setMessage(null);

    try {
      await apiFetch(`/quotes/${quoteId}/send`, {
        method: "POST",
      });

      setStatus("sent");
      setMessage({
        type: "success",
        text: "Quote email sent successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to send quote.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {backButton}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Quote Builder
            </h1>
            <p className="text-sm text-slate-500">
              Build and save a polished customer quote.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {onHomeClick ? (
              <button
                type="button"
                onClick={onHomeClick}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Dashboard
              </button>
            ) : null}

          {onNewQuote ? (
            <button
              type="button"
              onClick={onNewQuote}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              New Quote
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleSendQuote}
            disabled={sending || !user?.emailVerified}
            className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Quote"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loadingAction === "save"}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loadingAction === "save" ? "Saving..." : "Save Quote"}
          </button>
        </div>
      </div>

      {user && !user.emailVerified ? (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Please confirm your email before sending quotes to customers.
          </div>
        ) : null}

      {message ? (
        <div
          className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
            message.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message.text}
        </div>
      ) : null}

      <div className="rounded-[28px] border border-emerald-100 bg-white px-8 py-8 shadow-sm lg:px-12">
        <div className="mb-8 flex flex-col gap-8 border-b border-slate-200 pb-8 md:flex-row md:justify-between">
          <div>
            <div className="text-3xl font-semibold tracking-tight text-emerald-700">
              {title || "Quote"}
            </div>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <div>
                <span className="font-medium text-slate-900">Quote Number:</span>{" "}
                {displayQuoteNumber}
              </div>
              <div>
                <span className="font-medium text-slate-900">Created:</span>{" "}
                {displayQuoteDate}
              </div>
              <div>
                <span className="font-medium text-slate-900">Status:</span>{" "}
                <span className="capitalize">{status}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-600 md:text-right">
            {user?.logoUrl ? (
              <div className="mb-3 flex justify-start md:justify-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.logoUrl}
                  alt="Business logo"
                  className="max-h-14 max-w-[180px] object-contain"
                />
              </div>
            ) : null}

            <div className="font-medium text-slate-900">
              {user?.businessName || user?.name || "Your Business"}
            </div>
            {user?.phone ? <div>{user.phone}</div> : null}
            {user?.email ? <div>{user.email}</div> : null}
          </div>
        </div>

        <div className="mb-8 grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600/70">
              Customer
            </div>
            {customerDetails ? (
              <div className="space-y-1 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">
                  {customerDetails.name}
                </div>
                {customerDetails.company ? <div>{customerDetails.company}</div> : null}
                {customerDetails.email ? <div>{customerDetails.email}</div> : null}
                {customerDetails.phone ? <div>{customerDetails.phone}</div> : null}
                {[customerDetails.address1, customerDetails.address2, customerDetails.city, customerDetails.county, customerDetails.postcode]
                  .filter(Boolean)
                  .length > 0 ? (
                  <div className="pt-1 text-slate-500">
                    {[customerDetails.address1, customerDetails.address2, customerDetails.city, customerDetails.county, customerDetails.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-sm text-slate-500">No customer selected.</div>
            )}
          </div>

          <div className="max-w-sm md:ml-auto md:w-full">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600/70">
              Quote Options
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Quote Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
                  placeholder="Quote title"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900">Items</div>
            <div className="text-sm text-slate-500">
              Add labour, materials and extras.
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add Item
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-[1.15fr_1.6fr_0.5fr_0.7fr_0.7fr_0.45fr] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <div>Item</div>
            <div>Description</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>
            <div></div>
          </div>

          <div className="divide-y divide-slate-200">
            {items.map((item, index) => {
              const quantity = parseFloat(item.quantity || "0");
              const unitPrice = parseFloat(item.unitPrice || "0");
              const lineTotal = quantity * unitPrice;

              return (
                <div
                  key={index}
                  className="grid grid-cols-[1.15fr_1.6fr_0.5fr_0.7fr_0.7fr_0.45fr] gap-3 px-4 py-3"
                >
                  <input
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    placeholder="Item"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <input
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <div className="flex items-center text-sm font-medium text-slate-800">
                    {formatMoney(lineTotal)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600/70">
              Notes
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes for the customer"
              className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 text-lg font-semibold text-slate-900">Pricing</div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                >
                  <option value="fixed">Fixed £</option>
                  <option value="percent">Percent %</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Discount Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  VAT Mode
                </label>
                <select
                  value={vatMode}
                  onChange={(e) => setVatMode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                >
                  <option value="standard">Standard</option>
                  <option value="none">None</option>
                  <option value="exempt">Exempt</option>
                  <option value="reverse_charge">Reverse Charge</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  VAT Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                  disabled={vatMode !== "standard"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-100 pt-6">
          <div className="ml-auto max-w-sm space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount</span>
              <span>-{formatMoney(discountAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT</span>
              <span>{formatMoney(vatAmount)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-emerald-100 pt-3 text-xl font-semibold text-emerald-700">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}