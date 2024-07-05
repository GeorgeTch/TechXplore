import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Toaster from "@/components/ui/toaster";
import Nav from "@/components/navigation/nav";
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "next-client-cookies/server";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "INVEST X ",
  description: "Real Investment in Real Estate",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <CookiesProvider>
          <body className={roboto.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col justify-between px-6 md:px-12 max-w-8xl mx-auto mt-16">
                <Nav />
                <Toaster />
                {children}
              </div>
            </ThemeProvider>
          </body>
        </CookiesProvider>
      </html>
    </SessionProvider>
  );
}
