import { RequireAuth } from "@/components/auth/RequireAuth";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <section>{children}</section>
    </RequireAuth>
  );
}