"use client";

import { ShareIcon, CodeIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Thread } from "@/components/assistant-ui/thread";
import { ThemeToggle } from "@/components/theme-toggle";
import { ModelSelector } from "@/components/model-selector";
import { AppSidebar } from "@/components/app-sidebar";
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
    <header className="flex gap-2 items-center px-4 py-3 border-b border-border/50 bg-gradient-to-r from-background/95 to-background backdrop-blur-sm">
      <SidebarTrigger className="md:hidden" />
      <Link href="/demo" className="hidden md:inline-block">
        <ButtonWithTooltip
          variant="outline"
          size="icon"
          tooltip="CodeBlock Demo"
          side="bottom"
          className="shrink-0"
        >
          <CodeIcon className="size-4" />
        </ButtonWithTooltip>
      </Link>
      <ModelSelector />
      <ThemeToggle />
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

export const NEXAInterface = () => {
  // Note: user will be undefined for now - can be integrated with auth later
  const user = undefined;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar user={user} />
        <SidebarInset className="flex flex-col">
          <Header />
          <div className="flex-1 overflow-hidden bg-background relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-muted/10 pointer-events-none"></div>
            <Thread />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};