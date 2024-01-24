import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/lib/components/theme-provider";

export const metadata = {
  title: "YGOManager",
  description:
    "Manage your collection and get prices for decks you want to build",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
