"use client";

import { ChatGPTInterface } from "./ChatGPTInterface";
import ChatProvider from "@/components/ChatProvider";

export default function ChatApp() {
  return (
    <ChatProvider>
      <main className="h-screen">
        <ChatGPTInterface />
      </main>
    </ChatProvider>
  );
}