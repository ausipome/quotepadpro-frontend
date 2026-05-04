import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "QuotePadPro",
  description: "Create and send professional quotes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}