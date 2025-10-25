"use client";

import { AppSidebar } from "./app-sidebar";
import { ChatHeader } from "./chat-header";
import { Thread } from "@/components/assistant-ui/thread";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const ChatGPTInterface = () => {
  // Mock user for demonstration - in a real app this would come from auth
  const user = {
    id: "1",
    email: "demo@example.com",
    name: "Demo User"
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar user={user} />
        <SidebarInset className="flex-1">
          <ChatHeader />
          <div className="flex-1 overflow-hidden bg-background">
            <Thread />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};