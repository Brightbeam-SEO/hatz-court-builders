import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/layout/site-chrome";
import { archivo, bigShoulders } from "@/lib/fonts";
import "./globals.css";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f0",
};

export const metadata: Metadata = {
  title: "Court Builders Boise & Scottsdale | Hatz Court Builders",
  description:
    "Hatz Court Builders designs and builds custom pickleball, tennis, basketball, and multi-use courts in Boise and Scottsdale. Get started today.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`min-h-full antialiased ${archivo.variable} ${bigShoulders.variable}`}
    >
      <body className={`${archivo.className} flex min-h-full min-w-0 flex-col overflow-x-clip`}>
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        ) : null}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
