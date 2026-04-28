"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND_LOGO_URL } from "@/lib/branding";

export default function ExampleQuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-[760px]"
    >
      <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 px-6 py-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-3xl font-semibold tracking-tight text-emerald-700">
                EV Charger Installation
              </div>
              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <div>
                  <span className="font-medium text-slate-900">Quote Number:</span>{" "}
                  Q-1007
                </div>
                <div>
                  <span className="font-medium text-slate-900">Created:</span>{" "}
                  23 Apr 2026
                </div>
                <div>
                  <span className="font-medium text-slate-900">Expiry Date:</span>{" "}
                  30 Apr 2026
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-600 md:text-right">
              <div className="mb-2 inline-flex px-3 py-2">
                <Image
                src={BRAND_LOGO_URL}
                alt="QuotePadPro logo"
                width={140}
                height={40}
                className="h-9 w-auto"
              />
              </div>
              <div className="font-semibold text-slate-900">QuotePadPro Electrical</div>
              <div>martyn@quotepadpro.com</div>
              <div>07400 000000</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-6 py-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600/80">
              Customer
            </div>
            <div className="space-y-1 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">James Morgan</div>
              <div>James Morgan Building Ltd</div>
              <div>james@example.com</div>
              <div>12 High Street, Haverfordwest, SA61 1AA</div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Clean, professional and ready to send
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1.1fr_1.5fr_0.45fr_0.65fr_0.65fr] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div>Item</div>
              <div>Description</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            <div className="divide-y divide-slate-200 text-sm">
              <div className="grid grid-cols-[1.1fr_1.5fr_0.45fr_0.65fr_0.65fr] gap-3 px-4 py-3">
                <div className="font-medium text-slate-900">Charger Install</div>
                <div className="text-slate-600">Supply and fit 7kW smart charger</div>
                <div>1</div>
                <div>£650.00</div>
                <div className="font-medium">£650.00</div>
              </div>

              <div className="grid grid-cols-[1.1fr_1.5fr_0.45fr_0.65fr_0.65fr] gap-3 px-4 py-3">
                <div className="font-medium text-slate-900">Testing</div>
                <div className="text-slate-600">Certification and handover</div>
                <div>1</div>
                <div>£100.00</div>
                <div className="font-medium">£100.00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-6 py-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600/80">
              Notes
            </div>
            <p className="rounded-2xl border border-slate-200 px-4 py-4 text-sm leading-7 text-slate-600">
              Includes installation, commissioning and certification. Final position
              to be agreed on site before install.
            </p>
          </div>

          <div className="self-end rounded-2xl border border-emerald-100 bg-slate-50 p-5">
            <div className="mb-4 text-lg font-semibold text-slate-900">Summary</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>£750.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount</span>
                <span>-£0.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT</span>
                <span>£150.00</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-emerald-100 pt-3 text-xl font-semibold text-emerald-700">
                <span>Total</span>
                <span>£900.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}