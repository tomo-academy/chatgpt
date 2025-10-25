"use client"

import { SidebarToggle } from "@/components/sidebar-toggle"
import { ModelPicker } from "./ModelPicker"
import { Button } from "@/components/ui/button"
import { ShareIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-2 bg-background/80 backdrop-blur-md border-b border-border px-3 py-2 md:px-4">
      <SidebarToggle />

      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ChatGPT Enhanced
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            OpenAI + Gemini AI Assistant
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <ModelPicker />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto shrink-0"
            >
              <ShareIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Share
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}