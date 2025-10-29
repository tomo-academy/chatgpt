import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.ajstudioz.co.in"),
  title: "AJ STUDIOZ CHAT - AI-Powered Assistant",
  description: "AJ STUDIOZ CHAT - Advanced AI Assistant with powerful chat capabilities, smart conversations, and seamless user experience. Built with cutting-edge AI technology.",
  keywords: ["AI chat", "AJ STUDIOZ", "artificial intelligence", "chatbot", "AI assistant", "conversation AI", "smart chat"],
  authors: [{ name: "AJ STUDIOZ", url: "https://ajstudioz.co.in" }],
  creator: "AJ STUDIOZ",
  publisher: "AJ STUDIOZ",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chat.ajstudioz.co.in",
    title: "AJ STUDIOZ CHAT - AI-Powered Assistant",
    description: "Advanced AI Assistant with powerful chat capabilities and seamless user experience",
    siteName: "AJ STUDIOZ CHAT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AJ STUDIOZ CHAT - AI Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ STUDIOZ CHAT - AI-Powered Assistant",
    description: "Advanced AI Assistant with powerful chat capabilities",
    images: ["/og-image.png"],
    creator: "@ajstudioz",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#3B82F6",
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}