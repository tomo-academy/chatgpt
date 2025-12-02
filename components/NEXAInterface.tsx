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
    <header className="flex gap-4 items-center px-6 py-3 border-b border-border bg-card">
      <SidebarTrigger className="md:hidden -ml-1" />
      
      {/* Logo and Title for larger screens */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-card-foreground">NEXA</span>
            <span className="text-xs text-muted-foreground">AI Assistant</span>
          </div>
        </div>
      </div>

      {/* Model Selector */}
      <div className="flex-1">
        <EnhancedModelSelector className="max-w-xs" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <Link href="/demo" className="hidden md:inline-block">
          <ButtonWithTooltip
            variant="ghost"
            size="sm"
            tooltip="Demo"
            side="bottom"
            className="h-8 px-2"
          >
            <CodeIcon className="size-4" />
          </ButtonWithTooltip>
        </Link>
        
        <ToggleTheme />
        <PrivacyPolicyModal />
        
        <ButtonWithTooltip
          variant="ghost"
          size="sm"
          tooltip="Share"
          side="bottom"
          className="h-8 px-2"
        >
          <ShareIcon className="size-4" />
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
        <div className="flex-1 overflow-hidden bg-background">
          <Thread />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};