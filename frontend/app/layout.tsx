import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oswald } from 'next/font/google'
import "./globals.css";
import Providers from './providers'
import { headers } from "next/headers";

const oswald = Oswald({
  subsets: ['latin'],
  variable: "--font-oswald",
  display: 'swap',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const trendSlab = localFont({
  src: "./fonts/TrendSlab.woff",
  variable: "--font-trendslab",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClubVote",
  description: "dEcEnTrALiZeD vOtiNg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookie = headers().get("cookie");

  return (
    <html lang="en" className={oswald.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${trendSlab.variable} ${oswald.variable} antialiased`}>
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
