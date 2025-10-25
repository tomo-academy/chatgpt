"use client";

import { Thread } from "@/components/assistant-ui/thread";

export function EnhancedChatInterface() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </div>
  );
}