"use client";

import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useChatContext } from "@/lib/chat-context";
import { useEffect } from "react";

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentChat, addMessage } = useChatContext();
  
  const chat = useChat({
    id: currentChat?.id,
    initialMessages: currentChat?.messages?.map(msg => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
    })) || [],
    onFinish: (message) => {
      // Save assistant message to our storage
      if (message.content) {
        addMessage({
          role: 'assistant',
          content: message.content,
        });
      }
    },
  });

  const runtime = useAISDKRuntime(chat);

  // Listen for new user messages and save them
  useEffect(() => {
    if (chat.messages.length > 0) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      if (lastMessage.role === 'user' && lastMessage.content) {
        // Check if this message is already in our storage
        const existingMessage = currentChat?.messages?.find(m => m.id === lastMessage.id);
        if (!existingMessage) {
          addMessage({
            role: 'user',
            content: lastMessage.content,
          });
        }
      }
    }
  }, [chat.messages, addMessage, currentChat?.messages]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AssistantRuntimeProvider>
  );
}