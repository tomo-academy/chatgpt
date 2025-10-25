import "./globals.css";
import type { Metadata } from "next";
import { ChatProvider } from "@/lib/chat-context";

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "A ChatGPT clone built with assistant-ui and Next.js",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}