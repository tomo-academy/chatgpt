"use client";

import React from 'react';
import { SendIcon, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface PromptInputSubmitProps extends React.ComponentProps<typeof Button> {
  status?: 'ready' | 'streaming';
}

export function Input({ onSubmit, children, className, ...props }: InputProps) {
  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} {...props}>
      {children}
    </form>
  );
}

export function PromptInputTextarea({
  className,
  ...props
}: PromptInputTextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      {...props}
    />
  );
}

export function PromptInputSubmit({
  status = 'ready',
  className,
  children,
  ...props
}: PromptInputSubmitProps) {
  const isStreaming = status === 'streaming';

  return (
    <Button
      type="submit"
      size="sm"
      className={cn(
        "h-8 w-8 p-0",
        className
      )}
      disabled={isStreaming}
      {...props}
    >
      {children || (
        isStreaming ? (
          <Square className="h-4 w-4" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )
      )}
      <span className="sr-only">
        {isStreaming ? 'Stop generating' : 'Send message'}
      </span>
    </Button>
  );
}