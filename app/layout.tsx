import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXA - AI Assistant",
  description: "NEXA - Advanced AI Assistant powered by OpenAI GPT and Google Gemini models",
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