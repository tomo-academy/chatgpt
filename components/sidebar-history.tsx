"use client"

import React from "react"
import { isToday, isYesterday, subMonths, subWeeks } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { useChatContext } from "@/lib/chat-context"

type Chat = {
  id: string
  title: string
  createdAt: string | Date
  userId?: string
  messages?: ChatMessage[]
  updatedAt?: string | Date
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type GroupedChats = {
  today: Chat[]
  yesterday: Chat[]
  lastWeek: Chat[]
  lastMonth: Chat[]
  older: Chat[]
}

const groupChatsByDate = (chats: Chat[]): GroupedChats => {
  const now = new Date()
  const oneWeekAgo = subWeeks(now, 1)
  const oneMonthAgo = subMonths(now, 1)

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.createdAt)

      if (isToday(chatDate)) {
        groups.today.push(chat)
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat)
      } else if (chatDate > oneWeekAgo) {
        groups.lastWeek.push(chat)
      } else if (chatDate > oneMonthAgo) {
        groups.lastMonth.push(chat)
      } else {
        groups.older.push(chat)
      }

      return groups
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats
  )
}

interface SidebarHistoryProps {
  user?: User
}

interface User {
  id?: string;
  email?: string;
  name?: string;
}

export function SidebarHistory({ user }: SidebarHistoryProps) {
  const router = useRouter()
  const { id } = useParams()
  const { chats, isLoading } = useChatContext()

  const groupedChats = groupChatsByDate(chats.map((chat: Chat) => ({
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt,
    userId: user?.id,
    messages: chat.messages,
    updatedAt: chat.updatedAt
  })))

  if (!user) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500">
            Login to save and revisit previous chats!
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
          Today
        </div>
        <SidebarGroupContent>
          <div className="flex flex-col">
            {[44, 32, 28, 64, 52].map((item) => (
              <div
                className="flex h-8 items-center gap-2 rounded-md px-2"
                key={item}
              >
                <div
                  className="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent-foreground/10"
                  style={
                    {
                      "--skeleton-width": `${item}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <div className="flex flex-col gap-6">
              {groupedChats.today.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                    Today
                  </div>
                  {groupedChats.today.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors ${
                        chat.id === id ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <span className="truncate">{chat.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {groupedChats.yesterday.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                    Yesterday
                  </div>
                  {groupedChats.yesterday.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors ${
                        chat.id === id ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <span className="truncate">{chat.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {groupedChats.lastWeek.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                    Last 7 days
                  </div>
                  {groupedChats.lastWeek.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors ${
                        chat.id === id ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <span className="truncate">{chat.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {groupedChats.lastMonth.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                    Last 30 days
                  </div>
                  {groupedChats.lastMonth.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors ${
                        chat.id === id ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <span className="truncate">{chat.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {groupedChats.older.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                    Older than last month
                  </div>
                  {groupedChats.older.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent transition-colors ${
                        chat.id === id ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <span className="truncate">{chat.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}