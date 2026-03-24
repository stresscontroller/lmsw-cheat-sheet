"use client"
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import SessionProvider from "@/utils/SessionProvider";
import Footer from "@/components/footer";
import "@/styles/globals.css";
import Head from '@/components/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderPaths = ["/chat", "/chatbot"];
  const hideFooterPaths = ["/chat", "/chatbot"];
  const shouldHideHeader =
    hideHeaderPaths.includes(pathname) || pathname.startsWith("/studio/") || pathname.startsWith("/chatbot/");
  const shouldHideFooter =
    hideFooterPaths.includes(pathname) || pathname.startsWith("/studio/") || pathname.startsWith("/chatbot/") || pathname.startsWith("/cheatsheet/");
  const shouldHideOverflowY = pathname.includes('cheatsheet');

  return (
    <html suppressHydrationWarning lang="en">
      <Head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased overflow-x-hidden",
          { "overflow-y-hidden": shouldHideOverflowY },
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative flex flex-col h-screen">
              <div id="alert-container"></div>
              {!shouldHideHeader && <Navbar />}
              <main className="w-full bg-content1">
                {children}
              </main>
              {!shouldHideFooter && <Footer />}
            </div>
          </Providers>
        </SessionProvider>
        <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-55DHXVHD"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      </body>
    </html >
  );
}
