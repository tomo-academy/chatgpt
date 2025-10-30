"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { saveChat, loadChats } from "@/lib/chat-local-storage";

export default function NewLocalChat() {
  const router = useRouter();

  function handleNewLocalChat() {
    // create a lightweight local chat object
    const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const chat = {
      id,
      messages: [],
    };

    saveChat(chat as any);

    // navigate to the chat page
    router.push(`/chat/${id}`);
  }

  return (
    <Button
      onClick={handleNewLocalChat}
      className="aui-thread-list-new-local flex items-center justify-start gap-1 rounded-lg px-2.5 py-2 text-start hover:bg-muted"
      variant="ghost"
    >
      <PlusSquare />
      New Local
    </Button>
  );
}
