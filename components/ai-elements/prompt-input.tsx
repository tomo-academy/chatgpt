"use client";

import React from 'react';
import { SendIcon, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InputProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

type PromptInputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface PromptInputSubmitProps extends React.ComponentProps<typeof Button> {
  status?: 'ready' | 'streaming';
}

export function Input({ onSubmit, children, className, ...props }: InputProps) {
  return (
    <form onSubmit={onSubmit} className={cn("relative rounded-xl", className)} {...props}>
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
        "flex min-h-[48px] w-full rounded-xl border-0 bg-muted/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200 shadow-lg hover:shadow-xl dark:bg-muted/30 dark:hover:bg-muted/40",
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
        "h-10 w-10 p-0 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-lg",
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