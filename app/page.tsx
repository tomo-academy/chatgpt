"use client";

import dynamicImport from 'next/dynamic';

const ChatApp = dynamicImport(() => import('@/components/ChatApp'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )
});

export default function Home() {
  return <ChatApp />;
}