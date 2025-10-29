"use client";

import Image from "next/image";
import type { User } from "@/lib/types";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "./toast";

interface SettingsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ user, open, onOpenChange }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();

  const isGuest = !user || user.email?.includes("guest") || !user.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Settings
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  alt={isGuest ? "Guest User" : user.name || user.email || "User Avatar"}
                  className="rounded-full"
                  height={64}
                  src={
                    isGuest 
                      ? "https://avatar.vercel.sh/guest" 
                      : user.image || `https://avatar.vercel.sh/${user.email}`
                  }
                  width={64}
                  unoptimized
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      placeholder={isGuest ? "Guest User" : user.name || "Enter your name"}
                      defaultValue={isGuest ? "Guest User" : user.name || ""}
                      disabled={isGuest}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={isGuest ? "guest@example.com" : user.email || "Enter your email"}
                      defaultValue={isGuest ? "guest@example.com" : user.email || ""}
                      disabled={isGuest}
                    />
                  </div>
                </div>
              </div>
              {isGuest && (
                <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Sign in to save your profile information and chat history.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-mode">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing for more content
                  </p>
                </div>
                <Switch
                  id="compact-mode"
                  defaultChecked={false}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Compact mode enabled"
                        : "Compact mode disabled",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Chat Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
              <CardDescription>Configure your chat experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="save-history">Save Chat History</Label>
                  <p className="text-sm text-muted-foreground">
                    Store your conversations for later access
                  </p>
                </div>
                <Switch
                  id="save-history"
                  defaultChecked={!isGuest}
                  disabled={isGuest}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Chat history will be saved"
                        : "Chat history will not be saved",
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-scroll">Auto Scroll</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically scroll to new messages
                  </p>
                </div>
                <Switch
                  id="auto-scroll"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Auto scroll enabled"
                        : "Auto scroll disabled",
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="typing-indicator">Typing Indicator</Label>
                  <p className="text-sm text-muted-foreground">
                    Show when AI is generating response
                  </p>
                </div>
                <Switch
                  id="typing-indicator"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Typing indicator enabled"
                        : "Typing indicator disabled",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Control how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new messages
                  </p>
                </div>
                <Switch
                  id="browser-notifications"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Browser notifications enabled"
                        : "Browser notifications disabled",
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  defaultChecked={false}
                  disabled={isGuest}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Email notifications enabled"
                        : "Email notifications disabled",
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-effects">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for actions
                  </p>
                </div>
                <Switch
                  id="sound-effects"
                  defaultChecked={false}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Sound effects enabled"
                        : "Sound effects disabled",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>Control your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by sharing usage data
                  </p>
                </div>
                <Switch
                  id="analytics"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Analytics enabled"
                        : "Analytics disabled",
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="crash-reports">Crash Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send crash reports
                  </p>
                </div>
                <Switch
                  id="crash-reports"
                  defaultChecked={true}
                  onCheckedChange={(checked: boolean) => {
                    toast({
                      type: "success",
                      description: checked
                        ? "Crash reports enabled"
                        : "Crash reports disabled",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          {!isGuest && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Delete All Chats</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all your chat history
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      toast({
                        type: "error",
                        description: "This feature is coming soon!",
                      });
                    }}
                  >
                    Delete All
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      toast({
                        type: "error",
                        description: "This feature is coming soon!",
                      });
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
