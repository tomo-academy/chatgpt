"use client";

import { ShareIcon, CodeIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Thread } from "@/components/assistant-ui/thread";
import { ToggleTheme } from "@/components/toggle-theme";
import { EnhancedModelSelector } from "@/components/enhanced-model-selector";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import PrivacyPolicyModal from "@/components/privacy-policy-modal";

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
    <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden p-1 hover:bg-accent rounded-md" />
        <div className="hidden md:block">
          <span className="font-semibold text-foreground">ChatGPT</span>
        </div>
      </div>

      {/* Model Selector */}
      <div className="flex-1 flex justify-center">
        <EnhancedModelSelector className="w-auto min-w-[200px]" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <ButtonWithTooltip
          variant="ghost"
          size="sm"
          tooltip="New chat"
          side="bottom"
          className="p-2 h-auto"
        >
          <CodeIcon className="size-4" />
        </ButtonWithTooltip>
        
        <ToggleTheme />
        
        <ButtonWithTooltip
          variant="ghost"
          size="sm"
          tooltip="Share"
          side="bottom"
          className="p-2 h-auto"
        >
          <ShareIcon className="size-4" />
        </ButtonWithTooltip>
        
        <PrivacyPolicyModal />
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