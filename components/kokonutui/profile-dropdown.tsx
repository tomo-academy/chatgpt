"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, CreditCard, FileText, LogOut, User } from "lucide-react";
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
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none w-full text-left"
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                {data.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-foreground font-normal truncate">
                                    {data.name}
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>



                    <DropdownMenuContent
                        align="start"
                        sideOffset={8}
                        className="w-64 p-2 bg-popover border border-border rounded-lg shadow-lg"
                    >
                        <div className="px-2 py-1.5 border-b border-border mb-1">
                            <div className="font-medium text-sm">{data.name}</div>
                            <div className="text-xs text-muted-foreground">{data.email}</div>
                        </div>
                        
                        <div className="space-y-0.5">
                            {menuItems.slice(0, -1).map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 px-2 py-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
                                    >
                                        {item.icon}
                                        <span className="text-sm">
                                            {item.label}
                                        </span>
                                        {item.value && (
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {item.value}
                                            </span>
                                        )}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>

                        <DropdownMenuSeparator className="my-2" />

                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full flex items-center gap-3 px-2 py-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Log out</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>
        </div>
    );
}
