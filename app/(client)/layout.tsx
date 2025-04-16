import type { Metadata, Viewport } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "./providers";

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
  title: " CNC Cannabis | Premium Cannabis Phuket",
  description: "Experience premium Cannabis with  CNC Cannabis. We offer high-quality Cannabis for an exceptional brewing experience.",
  keywords: " premium Cannabis, Cannabis phuket, premium Cannabis phuket,  CNC Cannabis, Premium weed phuket",
  authors: [{ name: " CNC Cannabis" }],
  creator: " CNC Cannabis",
  publisher: " CNC Cannabis",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "th_THAI",
    url: "https://www. CNC.shop",
    siteName: " CNC",
    title: " CNC Cannabis Phuket | Premium Cannabis Phuket",
    description: "Experience premium Cannabis with  CNC Cannabis. We offer high-quality Cannabis for an exceptional brewing experience.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: " CNC Cannabis Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: " CNC Cannabis | Premium Cannabis Phuket",
    description: "Experience premium Cannabis with  CNC Cannabis. We offer high-quality Cannabis for an exceptional brewing experience.",
    images: ["/logo.png"],
    creator: "@ CNCShop",
  },
  verification: {
    google: "google-site-verification-code",
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
      <html lang="en" suppressHydrationWarning>
        <body className={`${raleway.variable} antialiased`}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />
              <Toaster position="bottom-right" theme="dark" />
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}