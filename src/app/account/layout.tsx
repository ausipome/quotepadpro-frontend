import { RequireAuth } from "@/components/auth/RequireAuth";
import AppTopBar from "@/components/navigation/AppTopBar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <section className="min-h-screen bg-white">
        <AppTopBar />
        {children}
      </section>
    </RequireAuth>
  );
}