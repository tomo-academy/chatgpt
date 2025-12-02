"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { PlusIcon } from "@/components/icons";
import { SidebarHistory } from "@/components/sidebar-history";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ProfileDropdown from "@/components/kokonutui/profile-dropdown";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-accent transition-colors"
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
            >
              <span className="font-semibold text-base">
                ChatGPT
              </span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push("/");
                    router.refresh();
                  }}
                  type="button"
                  variant="ghost"
                  size="sm"
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end" side="bottom">
                New Chat
              </TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-border">
        <ProfileDropdown 
          data={{
            name: user?.name || "User",
            email: user?.email || "user@example.com",
            avatar: user?.image || "https://github.com/shadcn.png",
            subscription: "Plus",
            model: "GPT-4",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
