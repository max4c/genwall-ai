import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenWall AI",
  description: "Generate dynamic AI wallpapers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <header className="absolute top-0 left-0 w-full p-4 md:p-6 z-10">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <Image
              src="/logo.svg"
              alt="GenWall AI Logo"
              width={48}
              height={48}
              className="dark:invert transition-transform group-hover:scale-110"
            />
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              genwall.ai
            </span>
          </Link>
        </header>

        <div className="pt-16 md:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
