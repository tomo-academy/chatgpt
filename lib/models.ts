export const models = {
  "hanuman-s1": {
    name: "Hanuman S-1 ⚡",
    description: "Lightning Fast - Optimized for speed",
  },
  "aj-deepseek": {
    name: "AJ DeepSeek",
    description: "16GB Optimized - Best for complex tasks",
  },
} as const;

export type ModelID = keyof typeof models;
