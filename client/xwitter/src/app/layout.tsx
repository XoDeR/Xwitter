import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xwitter",
  description: "X (Twitter) clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Async Server Component */}
        <Login />
        {children}
      </body>
    </html>
  );
}
