import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking System",
  description: "A simple booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Booking System</Link>
            <Link href="/new-booking" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
              New Booking
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
