"use client";

import { Thread } from "@/components/assistant-ui/thread";
import ChatProvider from "@/components/ChatProvider";
import { useEffect, useState } from "react";

export default function ChatApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <main className="h-screen">
        <Thread />
      </main>
    </ChatProvider>
  );
}