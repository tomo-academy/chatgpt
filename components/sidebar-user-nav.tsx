"use client";

import { 
  ChevronUp, 
  Settings, 
  MessageSquare, 
  CheckSquare, 
  FileText, 
  HelpCircle, 
  GitBranch, 
  Share2, 
  Crown,
  LogOut
} from "lucide-react";
import Image from "next/image";

import type { User } from "@/lib/types";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SettingsDialog } from "./settings-dialog";
import { toast } from "./toast";

export function SidebarUserNav({ user }: { user: User }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="h-10 bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              data-testid="user-nav-button"
            >
              <Image
                alt="Guest User"
                className="rounded-full object-cover"
                height={24}
                src="https://avatar.vercel.sh/guest"
                width={24}
                unoptimized
              />
              <span className="truncate" data-testid="user-email">
                Guest
              </span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            data-testid="user-nav-menu"
            side="top"
            align="end"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="leading-none text-sm font-medium">
                  Guest User
                </p>
                <p className="leading-none text-xs text-muted-foreground">
                  Enjoy NEXA without an account
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Report issue feature coming soon!" })}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Report Issue</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Tasks feature coming soon!" })}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Tasks</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Files feature coming soon!" })}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Files</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "FAQ coming soon!" })}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>FAQ</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Changelog coming soon!" })}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              <span>Changelog</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Shared links feature coming soon!" })}
            >
              <Share2 className="mr-2 h-4 w-4" />
              <span>Shared Links</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => toast({ type: "success", description: "Upgrade plans coming soon!" })}
            >
              <Crown className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Upgrade Plan</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer"
              data-testid="user-nav-item-theme"
              onSelect={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild data-testid="user-nav-item-auth">
              <button
                className="w-full cursor-pointer"
                onClick={() => {
                  toast({
                    type: "success", 
                    description: "Authentication coming soon!"
                  });
                }}
                type="button"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Login (Coming Soon)
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    
    <SettingsDialog user={user} open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
