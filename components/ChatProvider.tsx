"use client";

import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createContext, useContext, useState, useEffect } from "react";

interface ChatContextType {
  currentModel: string;
  setCurrentModel: (model: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  currentModel: "gpt-4o-mini",
  setCurrentModel: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentModel, setCurrentModel] = useState("gpt-4o-mini");

  // Store the current model globally for the API route to access
  useEffect(() => {
    (globalThis as Record<string, unknown>).currentModel = currentModel;
  }, [currentModel]);

  const chat = useChat();

  const runtime = useAISDKRuntime(chat);

  return (
    <ChatContext.Provider value={{ currentModel, setCurrentModel }}>
      <AssistantRuntimeProvider runtime={runtime}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </AssistantRuntimeProvider>
    </ChatContext.Provider>
  );
}