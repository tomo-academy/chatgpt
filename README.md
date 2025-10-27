# NEXA AI Assistant

An advanced AI assistant built with Next.js, Assistant UI, and the Vercel AI SDK.

## Features

- 🤖 NEXA AI interface
- 💬 Real-time streaming responses
- 🎨 Beautiful dark theme UI
- ⚡ Built with Next.js 15 and React 19
- 🛡️ Type-safe with TypeScript
- 📱 Responsive design

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nexa-ai/
├── app/
│   ├── api/chat/route.ts    # NEXA AI API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── NEXA.tsx             # Main chat interface
│   └── ChatProvider.tsx     # Chat runtime provider
└── lib/
    └── utils.ts             # Utility functions
```

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** Assistant UI + Radix UI
- **AI SDK:** Vercel AI SDK
- **Styling:** Tailwind CSS
- **TypeScript:** Full type safety
- **API:** OpenAI GPT-4

## Usage

1. Type your message in the input field
2. Press Enter or click Send
3. Watch as NEXA responds in real-time
4. Use the action buttons to copy, regenerate, or edit messages

## Customization

- **Modify the UI:** Edit components in `/components/ChatGPTInterface.tsx`
- **Change the model:** Update the model in `/app/api/chat/route.ts`
- **Add features:** Extend the chat functionality with additional AI SDK features

## Deployment

Deploy to Vercel with one click:

1. Push to GitHub
2. Connect to Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

## License

MIT License - feel free to use this for your own projects!