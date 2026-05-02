"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppTopBar from "@/components/navigation/AppTopBar";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/components/auth/AuthProvider";

export default function CheckoutCompletePage() {
  const router = useRouter();
  const { refreshMe } = useAuth();

  useEffect(() => {
    refreshMe().finally(() => {
      sessionStorage.setItem("auth_notice", "Your subscription is being activated. You now have access to QuotePadPro.");
      router.replace("/dashboard");
    });
  }, [refreshMe, router]);

  return (
    <RequireAuth>
      <main className="min-h-screen bg-slate-50">
        <AppTopBar />
        <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[720px] items-center justify-center px-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Finalising your trial…</h1>
            <p className="mt-3 text-sm text-slate-500">We are confirming your subscription and opening your dashboard.</p>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
