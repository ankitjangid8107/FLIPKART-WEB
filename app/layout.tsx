import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "tvc0.pro — Online Shopping for Mobiles, Fashion & More", template: "%s · tvc0.pro" },
  description:
    "tvc0.pro — India's cleanest online store. Shop mobiles, laptops, fashion, home & more with free delivery, easy returns and secure payments.",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </StoreProvider>
      </body>
    </html>
  );
}
