"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarBody } from "@/components/sidebar";
import { IconPlus, IconHome, IconSettings } from "@tabler/icons-react";
import { motion } from "motion/react";

export function AnimatedAppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          
          <Button
            className="mt-4 mb-6 w-full"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            type="button"
            variant="default"
          >
            <IconPlus className="h-4 w-4 mr-2" />
            <span>New Chat</span>
          </Button>

          {!user ? (
            <div className="flex h-full w-full items-center justify-center text-center text-sm text-muted-foreground px-2">
              Login to save and revisit previous chats!
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="text-xs text-muted-foreground px-2">Recent Chats</div>
              {/* SidebarHistory would go here when user is logged in */}
            </div>
          )}
        </div>
        
        {user && (
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
            <div className="flex items-center gap-2">
              <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                <span className="text-xs">{user.email?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{user.email}</span>
              </div>
            </div>
          </div>
        )}
      </SidebarBody>
    </Sidebar>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">⚡</span>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-white"
      >
        NEXA
      </motion.span>
    </Link>
  );
};
