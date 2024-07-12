"use client";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function SessionWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
