import type { Metadata, Viewport } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const raleway = localFont({
  src: "../fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Medican Cannabis | Premium Coffee Capsules",
  description: "Experience premium imported coffee capsules with Medican Cannabis. We offer high-quality coffee capsules for an exceptional brewing experience.",
  keywords: "coffee capsules, premium coffee, imported coffee, Medican Cannabis, coffee pods",
  authors: [{ name: "Medican Cannabis" }],
  creator: "Medican Cannabis",
  publisher: "Medican Cannabis",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "th_THAI",
    url: "https://Capsoul.online",
    siteName: "TFI COFFEE",
    title: "Medican Cannabis | Premium Coffee Capsules",
    description: "Experience premium imported coffee capsules with Medican Cannabis. We offer high-quality coffee capsules for an exceptional brewing experience.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Medican Cannabis Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medican Cannabis | Premium Coffee Capsules",
    description: "Experience premium imported coffee capsules with Medican Cannabis. We offer high-quality coffee capsules for an exceptional brewing experience.",
    images: ["/logo.png"],
    creator: "@Capsoulcoffee",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual Google verification code
  },
  category: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}