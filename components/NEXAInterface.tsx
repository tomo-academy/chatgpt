"use client";

import { ShareIcon, CodeIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Thread } from "@/components/assistant-ui/thread";
import { ToggleTheme } from "@/components/toggle-theme";
import { ModelSelector } from "@/components/model-selector";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from "@/components/basic-dropdown";
import PrivacyPolicyModal from "@/components/privacy-policy-modal";
import { UserIcon, SettingsIcon, LogOutIcon } from "lucide-react";

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
    <header className="flex gap-2 items-center px-4 py-3 border-b border-sidebar-border bg-sidebar/95 backdrop-blur-sm">
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
      <ToggleTheme />
      <PrivacyPolicyModal />
      <ButtonWithTooltip
        variant="outline"
        size="icon"
        tooltip="Share"
        side="bottom"
        className="shrink-0"
      >
        <ShareIcon className="size-4" />
      </ButtonWithTooltip>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="outline" size="icon" className="ml-auto shrink-0">
            <UserIcon className="size-4" />
          </Button>
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownItem>
            <UserIcon className="size-4 mr-2" />
            Profile
          </DropdownItem>
          <DropdownItem>
            <SettingsIcon className="size-4 mr-2" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem destructive>
            <LogOutIcon className="size-4 mr-2" />
            Sign Out
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
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