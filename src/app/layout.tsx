import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuotePadPro",
  description: "Create and send professional quotes in seconds with QuotePadPro. Our intuitive platform streamlines the quoting process, allowing you to generate accurate and visually appealing quotes effortlessly. Whether you're a freelancer, small business owner, or enterprise, QuotePadPro is your go-to solution for efficient and professional quoting.",

  icons: {
    icon: [
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/favicon.ico",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },

  manifest: "/favicon/site.webmanifest",
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