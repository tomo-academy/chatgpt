"use client";

import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chat = useChat();

  const runtime = useAISDKRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AssistantRuntimeProvider>
  );
}