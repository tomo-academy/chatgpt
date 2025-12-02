import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppLoadingProvider } from "@/components/app-loader";
import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NEXA AI",
  description: "NEXA - Advanced AI Assistant built with assistant-ui and Next.js",
  icons: {
    icon: "/AJ.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppsSDKUIProvider linkComponent={Link}>
            <AppLoadingProvider>
              {children}
              <Toaster />
            </AppLoadingProvider>
          </AppsSDKUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}