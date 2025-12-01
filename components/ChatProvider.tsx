"use client";

import React, { useState, createContext } from "react";
import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export const ModelContext = createContext<{
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}>({
  selectedModel: "gpt-4o-mini",
  setSelectedModel: () => {},
});

// Global model state
let globalSelectedModel = "gpt-4o-mini";

// Intercept fetch to add model header
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const [url, options = {}] = args;
    if (typeof url === 'string' && url.includes('/api/chat')) {
      const headers = new Headers(options.headers);
      headers.set('x-model-id', globalSelectedModel);
      return originalFetch(url, { ...options, headers });
    }
    return originalFetch(...args);
  };
}

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  
  // Update global model state
  React.useEffect(() => {
    globalSelectedModel = selectedModel;
  }, [selectedModel]);
  
  const chat = useChat();

  const runtime = useAISDKRuntime(chat);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      <AssistantRuntimeProvider runtime={runtime}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </AssistantRuntimeProvider>
    </ModelContext.Provider>
  );
}