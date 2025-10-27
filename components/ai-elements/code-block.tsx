"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: React.ReactNode;
}

interface CodeBlockCopyButtonProps extends React.ComponentProps<typeof Button> {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: React.ReactNode;
}

const CodeBlockContext = React.createContext<{ code: string } | null>(null);

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  children,
  className,
  ...props
}: CodeBlockProps) {
  // Detect theme based on CSS custom properties or system preference
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "relative rounded-lg border bg-muted/20 overflow-hidden",
          className
        )}
        {...props}
      >
        {children && (
          <div className="absolute top-3 right-3 z-10">
            {children}
          </div>
        )}
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            textAlign: 'right',
            userSelect: 'none',
            opacity: 0.6,
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </CodeBlockContext.Provider>
  );
}

export function CodeBlockCopyButton({
  onCopy = () => console.log('Copied code to clipboard'),
  onError = (error) => console.error('Failed to copy code to clipboard', error),
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) {
  const context = React.useContext(CodeBlockContext);
  const [copied, setCopied] = useState(false);

  if (!context) {
    throw new Error('CodeBlockCopyButton must be used within a CodeBlock');
  }

  const { code } = context;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className={cn(
        "h-8 px-3 text-xs font-medium transition-all duration-200",
        copied 
          ? "bg-green-500 text-white hover:bg-green-600" 
          : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background",
        className
      )}
      {...props}
    >
      {children || (
        <>
          {copied ? (
            <CheckIcon className="h-3 w-3 mr-1" />
          ) : (
            <CopyIcon className="h-3 w-3 mr-1" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </>
      )}
    </Button>
  );
}