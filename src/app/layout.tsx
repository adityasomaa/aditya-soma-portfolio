import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import TransitionProvider from "@/components/providers/TransitionProvider";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const neueMontreal = localFont({
  src: [
    {
      path: "../fonts/NeueMontreal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeueMontreal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aditya Soma | Creative Developer",
    template: "%s | Aditya Soma",
  },
  description:
    "Portfolio of Aditya Soma, a Bali based creative developer crafting monochrome, grainy, anti-mainstream web experiences with smooth scroll and seamless transitions.",
  metadataBase: new URL("https://aditya-soma-portfolio.vercel.app"),
  openGraph: {
    title: "Aditya Soma | Creative Developer",
    description:
      "Monochrome, grainy, anti-mainstream web experiences. Based in Bali, working worldwide.",
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
    <html
      lang="en"
      className={`${neueMontreal.variable} h-full antialiased`}
    >
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
