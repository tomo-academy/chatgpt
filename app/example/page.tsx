'use client';

import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block';

const code = `function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`;

const Example = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">CodeBlock Example</h1>
    <p className="text-muted-foreground mb-4">
      Simple example of using the CodeBlock component with a React function.
    </p>
    
    <CodeBlock code={code} language="jsx">
      <CodeBlockCopyButton
        onCopy={() => console.log('Copied code to clipboard')}
        onError={() => console.error('Failed to copy code to clipboard')}
      />
    </CodeBlock>
  </div>
);

export default Example;