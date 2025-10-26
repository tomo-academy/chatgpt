"use client";

import { ShareIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ModelPicker } from "./ModelPicker";
import { Thread } from "@/components/assistant-ui/thread";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

type ButtonWithTooltipProps = ComponentPropsWithRef<typeof Button> & {
  tooltip: string;
  side?: TooltipContentProps["side"];
};

const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({
  children,
  tooltip,
  side = "top",
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...rest}>
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

const Header: FC = () => {
  return (
    <header className="flex gap-2">
      <SidebarTrigger className="md:hidden" />
      <ModelPicker />
      <ButtonWithTooltip
        variant="outline"
        size="icon"
        tooltip="Share"
        side="bottom"
        className="ml-auto shrink-0"
      >
        <ShareIcon className="size-4" />
      </ButtonWithTooltip>
    </header>
  );
};

export const ChatGPTInterface = () => {
  return (
    <SidebarProvider>
      <AppSidebar user={undefined} />
      <SidebarInset className="flex flex-col h-screen">
        <div className="bg-muted/40 px-3 py-2 border-b">
          <Header />
        </div>
        <main className="flex-1 overflow-hidden bg-background">
          <Thread />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};