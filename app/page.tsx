"use client";

import { Thread } from "@/components/assistant-ui/thread";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="h-screen">
      <Thread />
    </main>
  );
}