"use client"

import { PanelLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function SidebarToggle() {
  const { open } = useSidebar()

  return (
    <SidebarTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9",
          !open && "rounded-lg"
        )}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </SidebarTrigger>
  )
}