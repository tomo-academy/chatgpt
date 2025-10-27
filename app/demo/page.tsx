'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { codeBlockSchema } from '@/app/api/codegen/route';
import {
  Input,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block';
import { useState } from 'react';

export default function CodeBlockDemo() {
  const [input, setInput] = useState('');
  const { object, submit, isLoading } = useObject({
    api: '/api/codegen',
    schema: codeBlockSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      submit({ prompt: input });
    }
  };

  // Example code blocks for demonstration
  const exampleCode = {
    simpleReact: `function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`,
    
    javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55`,
    
    react: `import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Add a todo..."
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'line-through text-gray-500' : ''}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">CodeBlock Component Demo</h1>
          <p className="text-muted-foreground mt-2">
            Syntax highlighting, line numbers, and copy functionality for code blocks
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* AI Code Generator Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">AI Code Generator</h2>
          <div className="max-w-4xl mx-auto p-6 border rounded-lg h-[600px]">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto mb-4">
                {object?.code && object?.language && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Generated Code</h3>
                      <span className="text-sm text-muted-foreground">
                        {object.filename || `code.${object.language}`}
                      </span>
                    </div>
                    <CodeBlock
                      code={object.code}
                      language={object.language}
                      showLineNumbers={true}
                    >
                      <CodeBlockCopyButton
                        onCopy={() => console.log('Code copied to clipboard!')}
                        onError={(error) => console.error('Failed to copy:', error)}
                      />
                    </CodeBlock>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                )}
                {!object?.code && !isLoading && (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    Enter a prompt below to generate code
                  </div>
                )}
              </div>

              <Input
                onSubmit={handleSubmit}
                className="mt-4 w-full max-w-2xl mx-auto relative"
              >
                <PromptInputTextarea
                  value={input}
                  placeholder="Generate a React todo list component with TypeScript"
                  onChange={(e) => setInput(e.currentTarget.value)}
                  className="pr-12"
                />
                <PromptInputSubmit
                  status={isLoading ? 'streaming' : 'ready'}
                  disabled={!input.trim()}
                  className="absolute bottom-1 right-1"
                />
              </Input>
            </div>
          </div>
        </section>

        {/* Example Sections */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Examples</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Simple React Example - Your Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">Simple React Component (Your Example)</h3>
              <CodeBlock
                code={exampleCode.simpleReact}
                language="jsx"
                showLineNumbers={false}
              >
                <CodeBlockCopyButton
                  onCopy={() => console.log('Copied code to clipboard')}
                  onError={() => console.error('Failed to copy code to clipboard')}
                />
              </CodeBlock>
            </div>

            {/* JavaScript Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">JavaScript (with line numbers)</h3>
              <CodeBlock
                code={exampleCode.javascript}
                language="javascript"
                showLineNumbers={true}
              >
                <CodeBlockCopyButton
                  onCopy={() => console.log('JavaScript code copied!')}
                />
              </CodeBlock>
            </div>
          </div>

          <div className="mt-8">
            {/* React Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">Complex React Component (Todo List)</h3>
              <CodeBlock
                code={exampleCode.react}
                language="jsx"
                showLineNumbers={true}
              >
                <CodeBlockCopyButton
                  onCopy={() => console.log('React code copied!')}
                />
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Syntax Highlighting</h4>
              <p className="text-sm text-muted-foreground">
                Support for 100+ programming languages with Prism.js
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Line Numbers</h4>
              <p className="text-sm text-muted-foreground">
                Optional line numbers for better code reference
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Copy to Clipboard</h4>
              <p className="text-sm text-muted-foreground">
                One-click copy functionality with visual feedback
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Theme Support</h4>
              <p className="text-sm text-muted-foreground">
                Automatic light/dark theme switching
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}