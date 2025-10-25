'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useChatContext } from "@/lib/chat-context";

export function NewChatButton() {
  const { createNewChat } = useChatContext();

  const handleNewChat = () => {
    createNewChat();
  };

  return (
    <Button
      onClick={handleNewChat}
      className="w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80"
      variant="ghost"
    >
      <Plus className="h-4 w-4" />
      New Chat
    </Button>
  );
}