"use client";

import { ShareIcon, CodeIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Thread } from "@/components/assistant-ui/thread";
import { ToggleTheme } from "@/components/toggle-theme";
import { EnhancedModelSelector } from "@/components/enhanced-model-selector";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import PrivacyPolicyModal from "@/components/privacy-policy-modal";
import { Sparkles } from "lucide-react";

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
    <header className="flex gap-3 items-center px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="md:hidden -ml-2" />
      
      {/* Logo and Title for larger screens */}
      <div className="hidden lg:flex items-center gap-3 mr-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-foreground">NEXA AI</span>
            <span className="text-xs text-muted-foreground">Intelligent Assistant</span>
          </div>
        </div>
      </div>

      {/* Model Selector */}
      <EnhancedModelSelector className="flex-1 max-w-xs" />

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <Link href="/demo" className="hidden md:inline-block">
          <ButtonWithTooltip
            variant="ghost"
            size="sm"
            tooltip="CodeBlock Demo"
            side="bottom"
            className="shrink-0 h-9 px-3"
          >
            <CodeIcon className="size-4 mr-2" />
            <span className="hidden sm:inline">Demo</span>
          </ButtonWithTooltip>
        </Link>
        
        <ToggleTheme />
        <PrivacyPolicyModal />
        
        <ButtonWithTooltip
          variant="ghost"
          size="sm"
          tooltip="Share Conversation"
          side="bottom"
          className="shrink-0 h-9 px-3"
        >
          <ShareIcon className="size-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </ButtonWithTooltip>
      </div>
    </header>
  );
};

export const NEXAInterface = () => {
  // Note: user will be undefined for now - can be integrated with auth later
  const user = undefined;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Header />
        <div className="flex-1 overflow-hidden bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-muted/10 pointer-events-none"></div>
          <Thread />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};