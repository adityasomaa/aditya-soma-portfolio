import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import TransitionProvider from "@/components/providers/TransitionProvider";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Aditya Soma — Creative Developer",
    template: "%s — Aditya Soma",
  },
  description:
    "Portfolio of Aditya Soma — creative developer crafting monochrome, grainy, anti-mainstream web experiences with smooth scroll and seamless transitions.",
  metadataBase: new URL("https://aditya-soma-portfolio.vercel.app"),
  openGraph: {
    title: "Aditya Soma — Creative Developer",
    description:
      "Monochrome, grainy, anti-mainstream web experiences. Based in Jakarta, working worldwide.",
    url: "https://aditya-soma-portfolio.vercel.app",
    siteName: "Aditya Soma",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-ink text-paper flex min-h-full flex-col">
        <LenisProvider>
          <TransitionProvider>
            <Preloader />
            <CustomCursor />
            <GrainOverlay />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
