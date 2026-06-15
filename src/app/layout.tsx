import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/lib/theme-provider";
import { LangProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = buildMetadata();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uychi AI & IT Hub",
  url: "https://uychi.uz",
  logo: "https://uychi.uz/og.svg",
  description: "Uychi tumanidagi IT va sun'iy intellekt markazi — startaplar, IT kompaniyalar va yoshlar uchun texnologiya ekotizimi.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Istiqlol ko'chasi 15",
    addressLocality: "Uychi",
    addressRegion: "Namangan",
    addressCountry: "UZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+998792240000",
    contactType: "customer service",
    availableLanguage: ["Uzbek", "Russian", "English"],
  },
  sameAs: [
    "https://t.me/uychi_hub",
    "https://linkedin.com/company/uychi-hub",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none"
        >
          Asosiy kontentga o&apos;tish
        </a>
        <ThemeProvider><LangProvider>{children}</LangProvider></ThemeProvider>
      </body>
    </html>
  );
}
