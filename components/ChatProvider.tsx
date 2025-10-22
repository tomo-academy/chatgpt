"use client";

import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModelProvider, useModel } from "./ModelContext";
import { useCallback } from "react";

function ChatProviderInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedModel } = useModel();

  // Set the current model globally when it changes
  useCallback(() => {
    (globalThis as Record<string, unknown>).currentModel = selectedModel;
  }, [selectedModel])();

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

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModelProvider>
      <ChatProviderInner>
        {children}
      </ChatProviderInner>
    </ModelProvider>
  );
}