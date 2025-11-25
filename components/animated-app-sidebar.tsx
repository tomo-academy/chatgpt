"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/sidebar";
import { IconPlus, IconHome, IconPhoto, IconUpload, IconSettings, IconUser } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedAppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Gallery",
      href: "#",
      icon: <IconPhoto className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Upload",
      href: "#",
      icon: <IconUpload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
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
            className="mt-4 mb-6 w-full justify-start"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            type="button"
            variant="default"
          >
            <IconPlus className="h-4 w-4 mr-2 shrink-0" />
            <span>New Chat</span>
          </Button>

          <div className="mt-4 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>

          {!user && (
            <div className="mt-8 flex w-full items-center justify-center text-center text-xs text-muted-foreground px-2">
              Login to save and revisit previous chats!
            </div>
          )}
        </div>
        
        <div>
          {user ? (
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <SidebarLink
                link={{
                  label: user.email || "User",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={28}
                      height={28}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          ) : (
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <SidebarLink
                link={{
                  label: "Login",
                  href: "#",
                  icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
                }}
              />
            </div>
          )}
        </div>
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
        <Image
          src="/AJ.svg"
          alt="NEXA Logo"
          width={32}
          height={32}
          className="object-contain"
        />
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
