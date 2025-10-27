"use client";

import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simple syntax highlighting with CSS classes
const getLanguageClass = (language: string) => {
  const lang = language.toLowerCase();
  switch (lang) {
    case 'javascript':
    case 'js':
      return 'language-javascript';
    case 'typescript':
    case 'ts':
      return 'language-typescript';
    case 'jsx':
    case 'tsx':
      return 'language-jsx';
    case 'css':
      return 'language-css';
    case 'python':
    case 'py':
      return 'language-python';
    case 'bash':
    case 'shell':
    case 'sh':
      return 'language-bash';
    case 'json':
      return 'language-json';
    case 'markdown':
    case 'md':
      return 'language-markdown';
    case 'sql':
      return 'language-sql';
    default:
      return 'language-text';
  }
};

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: React.ReactNode;
}

interface CodeBlockCopyButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onError'> {
  onCopy?: () => void;
  onCopyError?: (error: Error) => void;
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
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    checkTheme();
    
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

  const languageClass = getLanguageClass(language);
  
  // Split code into lines for line numbers
  const lines = code.split('\n');

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "relative rounded-xl border-0 overflow-hidden shadow-xl backdrop-blur-sm",
          isDark 
            ? "bg-gradient-to-br from-gray-900/90 to-black/90 ring-1 ring-white/10" 
            : "bg-gradient-to-br from-gray-50/90 to-white/90 ring-1 ring-black/10",
          className
        )}
        {...props}
      >
        {children && (
          <div className="absolute top-3 right-3 z-10">
            {children}
          </div>
        )}
        
        {/* Language label */}
        {language && (
          <div className={cn(
            "px-4 py-3 text-xs font-medium border-b backdrop-blur-sm",
            isDark 
              ? "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-white/10 text-gray-300" 
              : "bg-gradient-to-r from-gray-100/80 to-gray-200/80 border-black/10 text-gray-600"
          )}>
            {language}
          </div>
        )}
        
        <div className="overflow-x-auto">
          <pre 
            className={cn(
              "p-4 text-sm leading-relaxed",
              isDark ? "text-gray-100" : "text-gray-800"
            )}
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' 
            }}
          >
            {showLineNumbers ? (
              <div className="flex">
                <div className={cn(
                  "pr-4 text-right select-none",
                  isDark ? "text-gray-500" : "text-gray-400"
                )}>
                  {lines.map((_, index) => (
                    <div key={index + 1} className="leading-relaxed">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <code className={languageClass}>
                    {code}
                  </code>
                </div>
              </div>
            ) : (
              <code className={languageClass}>
                {code}
              </code>
            )}
          </pre>
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
}

export function CodeBlockCopyButton({
  onCopy = () => console.log('Copied code to clipboard'),
  onCopyError = (error) => console.error('Failed to copy code to clipboard', error),
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
      onCopyError?.(error as Error);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className={cn(
        "h-9 px-3 text-xs font-medium transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl",
        copied 
          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform scale-105" 
          : "bg-background/90 backdrop-blur-sm text-foreground hover:bg-background/95 border border-border/50 hover:border-border",
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