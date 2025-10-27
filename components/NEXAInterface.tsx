"use client";

import { MenuIcon, ShareIcon, CodeIcon } from "lucide-react";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ComponentPropsWithRef, type FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

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

const TopLeft: FC = () => {
  return (
    <div className="flex h-full w-full items-center gap-3 px-3 text-sm font-semibold">
      <div className="inline size-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white text-xs font-bold">⚡</span>
      </div>
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold tracking-tight">NEXA</span>
    </div>
  );
};

const MainLeft: FC = () => {
  return <ThreadList />;
};

const LeftBarSheet: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <MenuIcon className="size-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="mt-6 flex flex-col gap-1">
          <TopLeft />
          <MainLeft />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Header: FC = () => {
  return (
    <header className="flex gap-2">
      <LeftBarSheet />
      <Link href="/demo">
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
  const sideStyle = "bg-gradient-to-b from-muted/30 to-muted/50 backdrop-blur-sm px-3 py-2 border-r border-border/50";
  const topStyle = "border-b border-border/50 shadow-sm";
  const leftStyle = "hidden md:block";

  return (
    <div className="grid h-full w-full grid-flow-col grid-rows-[auto_1fr] md:grid-cols-[250px_1fr] bg-gradient-to-br from-background via-background to-muted/20">
      <div className={cn(sideStyle, leftStyle, topStyle)}>
        <TopLeft />
      </div>
      <div className={cn(sideStyle, leftStyle, "overflow-y-auto")}>
        <MainLeft />
      </div>
      <div className={cn("bg-gradient-to-r from-background/95 to-background backdrop-blur-sm px-3 py-2", topStyle)}>
        <Header />
      </div>
      <div className="overflow-hidden bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-muted/10 pointer-events-none"></div>
        <Thread />
      </div>
    </div>
  );
};