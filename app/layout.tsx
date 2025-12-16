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
        <Footer />
      </body>
    </html>
  );
}