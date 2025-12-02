"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, CreditCard, FileText, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Gemini from "../icons/gemini";

interface Profile {
    name: string;
    email: string;
    avatar: string;
    subscription?: string;
    model?: string;
}

interface MenuItem {
    label: string;
    value?: string;
    href: string;
    icon: React.ReactNode;
    external?: boolean;
}

const SAMPLE_PROFILE_DATA: Profile = {
    name: "Eugene An",
    email: "eugene@kokonutui.com",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
    subscription: "PRO",
    model: "Gemini 2.0 Flash",
};

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: Profile;
    showTopbar?: boolean;
}

export default function ProfileDropdown({
    data = SAMPLE_PROFILE_DATA,
    className,
    ...props
}: ProfileDropdownProps) {
    const menuItems: MenuItem[] = [
        {
            label: "Profile",
            href: "#",
            icon: <User className="w-4 h-4" />,
        },
        {
            label: "Model",
            value: data.model,
            href: "#",
            icon: <Gemini className="w-4 h-4" />,
        },
        {
            label: "Subscription",
            value: data.subscription,
            href: "#",
            icon: <CreditCard className="w-4 h-4" />,
        },
        {
            label: "Settings",
            href: "#",
            icon: <Settings className="w-4 h-4" />,
        },
        {
            label: "Terms & Policies",
            href: "#",
            icon: <FileText className="w-4 h-4" />,
            external: true,
        },
    ];

    return (
        <div className={cn("relative", className)} {...props}>
            <DropdownMenu>
                <div className="group relative">
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-3 p-2 rounded-md bg-card border border-border hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none w-full"
                        >
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-muted p-0.5">
                                    <Image
                                        src={data.avatar}
                                        alt={data.name}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <div className="text-sm font-medium text-card-foreground truncate">
                                    {data.name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {data.email}
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>



                    <DropdownMenuContent
                        align="start"
                        sideOffset={4}
                        className="w-56 p-1 bg-popover border border-border rounded-md shadow-md"
                    >
                        <div className="space-y-0.5">
                            {menuItems.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            {item.icon}
                                            <span className="text-sm font-normal text-popover-foreground">
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {item.value && (
                                                <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>

                        <DropdownMenuSeparator className="my-1" />

                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-sm transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-normal">
                                    Sign Out
                                </span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>
        </div>
    );
}
