"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon, PlusIcon, ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function handleNewChat() {
    try {
      setIsCreating(true);
      const res = await fetch(`/api/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: "user-1",
          title: "New Chat",
          visibility: "private"
        }),
      });
      const data = await res.json();
      if (res.ok && data?.chat?.id) {
        router.push(`/chat/${data.chat.id}`);
      } else {
        console.error("Failed to create chat", data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-lg font-semibold">AJ STUDIOZ CHAT</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleNewChat} disabled={isCreating}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {isCreating ? "Creating..." : "New Chat"}
          </Button>
          <Button variant="outline" size="icon">
            <ShareIcon className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </header>

      {/* Chat Thread */}
      <div className="flex-1 overflow-hidden">
        <Thread />
      </div>
    </div>
  );
}