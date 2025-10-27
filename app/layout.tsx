import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXA AI",
  description: "NEXA - Advanced AI Assistant built with assistant-ui and Next.js",
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
        {children}
      </body>
    </html>
  );
}