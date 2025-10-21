"use client";

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AssistantRuntimeProvider>
  );
}