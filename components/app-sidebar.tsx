"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PlusIcon, TrashIcon, SettingsIcon } from "lucide-react"
import { SidebarHistory } from "@/components/sidebar-history"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { useChatContext } from "@/lib/chat-context"

interface AppSidebarProps {
  user?: any
}

export function AppSidebar({ user }: AppSidebarProps) {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const { createNewChat, deleteAllChats } = useChatContext()
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false)

  const handleNewChat = () => {
    createNewChat()
    setOpenMobile(false)
  }

  const handleDeleteAll = () => {
    deleteAllChats()
    setShowDeleteAllDialog(false)
  }

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <SidebarHeader className="border-b border-gray-100 dark:border-gray-800">
          <SidebarMenu>
            <div className="flex flex-row items-center justify-between p-4">
              <Link
                className="flex flex-row items-center gap-3"
                href="/"
                onClick={() => {
                  setOpenMobile(false)
                }}
              >
                <div className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="inline size-4 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    ChatGPT
                  </span>
                </div>
              </Link>
              
              <Button
                className="h-9 w-9 rounded-lg border border-gray-200 bg-white p-0 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={handleNewChat}
                type="button"
                variant="ghost"
              >
                <PlusIcon size={16} />
              </Button>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <div className="py-2">
            <SidebarHistory user={user} />
          </div>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-gray-100 p-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {user && (
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {user?.email || "User"}
                </span>
              </div>
            )}
            {!user && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Not signed in
              </div>
            )}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8 rounded-lg bg-transparent p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowDeleteAllDialog(true)}
                    type="button"
                    variant="ghost"
                  >
                    <TrashIcon size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all chats</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8 rounded-lg bg-transparent p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    type="button"
                    variant="ghost"
                  >
                    <SettingsIcon size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}