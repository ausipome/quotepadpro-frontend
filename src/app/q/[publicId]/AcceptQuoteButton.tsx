"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/api";

export default function AcceptQuoteButton({
  publicId,
  initialStatus,
}: {
  publicId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAccept() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/public/quotes/${publicId}/accept`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to accept quote");
      }

      setStatus("accepted");
      setMessage("Quote accepted successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to accept quote."
      );
    } finally {
      setLoading(false);
    }
  }

  if (status === "accepted") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        This quote has been accepted.
      </div>
    );
  }

  return (
    <div className="max-w-sm rounded-2xl border p-4">
      <div className="mb-3 text-sm text-gray-600">
        Happy to go ahead? You can accept this quote online.
      </div>

      <button
        type="button"
        onClick={handleAccept}
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-2.5 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Accepting..." : "Accept Quote"}
      </button>

      {message ? <p className="mt-3 text-sm text-gray-700">{message}</p> : null}
    </div>
  );
}