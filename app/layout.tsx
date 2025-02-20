import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from '@/components/SessionProvider';
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: 'NL to SQL',
  description: 'Natural Language To SQL',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Prahlad Pawar' }],

};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}<Analytics /></SessionProvider>
      </body>
    </html>
  );
}

