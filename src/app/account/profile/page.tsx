"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch } from "@/lib/api";
import { getTokenFromCookies } from "@/lib/auth";
import { User } from "@/types";

export default function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      businessName: user.businessName || "",
      phone: user.phone || "",
    });
  }, [user]);

  function updateField(
    key: "name" | "businessName" | "phone",
    value: string
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await apiFetch<User>("/me", {
        method: "PUT",
        body: form,
      });

      await refreshMe();

      setMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(file: File) {
    setSaving(true);
    setMessage(null);

    try {
      const token = getTokenFromCookies();

      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/me/logo`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to upload logo");
      }

      await refreshMe();

      setMessage({
        type: "success",
        text: "Logo uploaded successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload logo.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <RequireAuth>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Profile
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Set the business details shown on your quotes.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <Link
                href="/account/quotes"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Quotes
              </Link>
            </div>
          </div>

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

          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Business Name
                </label>
                <input
                  value={form.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Business phone number"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Logo
                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Upload Logo
                    </button>

                    {user?.logoFilename ? (
                      <span className="text-sm text-slate-600">
                        Current file: <span className="font-medium">{user.logoFilename}</span>
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500">
                        No logo uploaded yet
                      </span>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleLogoUpload(file);
                      }
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-lg font-semibold text-slate-900">Preview</div>

              <div className="rounded-2xl border border-slate-200 p-5">
                {user?.logoUrl ? (
                  <div className="mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.logoUrl}
                      alt="Logo preview"
                      className="max-h-16 max-w-[180px] object-contain"
                    />
                  </div>
                ) : null}

                <div className="space-y-1 text-sm text-slate-700">
                  <div className="font-semibold text-slate-900">
                    {form.businessName || form.name || "Your Business"}
                  </div>
                  {user?.email ? <div>{user.email}</div> : null}
                  {form.phone ? <div>{form.phone}</div> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}