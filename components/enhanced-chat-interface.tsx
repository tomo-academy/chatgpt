"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatContext } from "@/lib/chat-context";
import { useEffect } from "react";

export function EnhancedChatInterface() {
  const { currentChat } = useChatContext();

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </div>
  );
}