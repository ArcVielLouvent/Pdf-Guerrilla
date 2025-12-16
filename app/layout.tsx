import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SeoSchema } from "@/components/SeoSchema"; // Pastikan file ini ada (dari instruksi sebelumnya)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFGuerrilla - Tools PDF Gratis Tanpa Batas",
  description: "Konversi, gabung, dan edit PDF langsung di browser Anda. Gratis, cepat, dan aman tanpa upload ke server.",
  verification: {
    google: "X7Z0-8JvGmQOaGBzehMhJjlu20Ayx22WBAE6pt1TgNg",
    other: {
      "monetag": "efd1cc8f0312c303b8b728f91e1220e6",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <SeoSchema />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <Script 
          src="https://quge5.com/88/tag.min.js" 
          data-zone="193488" 
          data-cfasync="false"
          strategy="afterInteractive"
        />
        <Footer />
      </body>
    </html>
  );
}