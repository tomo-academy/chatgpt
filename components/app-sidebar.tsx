"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { PlusIcon } from "@/components/icons";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const createNewChat = async () => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user-1", // In real app, get from auth
          title: "New Chat",
          visibility: "private",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const { chat } = await response.json();
      
      setOpenMobile(false);
      router.push(`/chat/${chat.id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Failed to create new chat");
    }
  };

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row items-center justify-between">
            <Link
              className="flex flex-row items-center gap-3"
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
            >
              <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="cursor-pointer rounded-md px-2 font-semibold text-lg hover:bg-muted bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AJ STUDIOZ CHAT
              </span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 p-1 md:h-fit md:p-2"
                  onClick={createNewChat}
                  type="button"
                  variant="ghost"
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end" className="hidden md:block">
                New Chat
              </TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
