import type { Metadata } from 'next';
import '../src/styles/index.css';

export const metadata: Metadata = {
  title: 'NEXA - AI Assistant Platform',
  description: 'Advanced AI chat platform with multi-modal capabilities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}