import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./components/client/SessionWrapper";
import Header from "@/app/components/client/Header";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Sorteo Seguro",
  description: "Tu lugar seguro para sorteos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="modern-orange"
          themes={["modern-orange"]}
        >
          <Header />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionWrapper>
  );
}
