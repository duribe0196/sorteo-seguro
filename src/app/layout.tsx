import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./components/client/SessionWrapper";
import Header from "@/app/components/client/Header";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getUserSubscription } from "@/lib/actions/users";

export const metadata: Metadata = {
  title: "Sorteo Seguro",
  description: "Tu lugar seguro para sorteos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subscription = await getUserSubscription();

  return (
    <SessionWrapper>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="modern-orange"
          themes={["modern-orange"]}
        >
          <Header subscription={subscription} />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionWrapper>
  );
}
