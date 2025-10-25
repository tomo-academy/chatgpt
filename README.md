# ChatGPT Enhanced - OpenAI + Google Gemini AI Assistant

A powerful standalone ChatGPT clone built with Next.js, Assistant UI, and the Vercel AI SDK, featuring both OpenAI and Google Gemini AI models with a complete sidebar interface.

## 🚀 Features

- **🤖 Dual AI Support**: Switch between OpenAI GPT models and Google Gemini models
- **💬 Complete Sidebar**: Advanced chat history management with date grouping
- **🎨 Beautiful UI**: Modern dark theme with responsive design  
- **⚡ Real-time Streaming**: Live response streaming from AI models
- **📱 Mobile Responsive**: Works perfectly on all device sizes
- **🔄 Model Switching**: Easy switching between different AI providers
- **📝 Chat History**: Organized chat history with today/yesterday/week/month grouping
- **🛡️ Type-safe**: Built with TypeScript for better development experience

## 🤖 Supported AI Models

### OpenAI Models
- **GPT-4o-mini** (Default) - Latest efficient model
- **GPT-4o** - Most capable GPT-4 model
- **GPT-4** - Previous generation GPT-4
- **GPT-3.5 Turbo** - Fast and efficient

### Google Gemini Models
- **Gemini 1.5 Pro** - Most capable Gemini model
- **Gemini 1.5 Flash** - Fast and efficient
- **Gemini 1.0 Pro** - Reliable performance

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **UI Library:** Assistant UI + Radix UI
- **AI SDK:** Vercel AI SDK
- **Styling:** Tailwind CSS
- **TypeScript:** Full type safety
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Animations:** Framer Motion

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd chatgpt
npm install --legacy-peer-deps
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:
```env
# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Google AI API Key - Get from https://makersuite.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here

# Next.js Secret
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Getting API Keys

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Add billing information (required for API usage)

### Google AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your environment file

## 📁 Project Structure

```
chatgpt/
├── app/
│   ├── api/chat/route.ts     # AI API endpoint with dual provider support
│   ├── globals.css           # Global styles with sidebar variables
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── sidebar.tsx       # Complete sidebar implementation
│   │   ├── button.tsx        # Button component
│   │   └── ...
│   ├── assistant-ui/         # Assistant UI components
│   ├── app-sidebar.tsx       # Main sidebar with chat history
│   ├── chat-header.tsx       # Enhanced header with toggle
│   ├── sidebar-history.tsx   # Chat history management
│   ├── ModelPicker.tsx       # AI model selector
│   └── ChatGPTInterface.tsx  # Main interface
└── lib/
    └── utils.ts              # Utility functions
```

## 🎯 Usage

### Switching AI Models
1. Click the model selector in the header
2. Choose between OpenAI and Google Gemini models
3. Each model has different capabilities and pricing

### Managing Chat History
- **Today/Yesterday/Week/Month**: Chats are automatically grouped by date
- **Click any chat**: Resume previous conversations
- **Sidebar Toggle**: Hide/show sidebar with the toggle button
- **New Chat**: Click the "+" button to start fresh

### Keyboard Shortcuts
- **Ctrl/Cmd + B**: Toggle sidebar
- **Enter**: Send message
- **Shift + Enter**: New line in message

## 🌟 Features in Detail

### Complete Sidebar Implementation
- **Date-based Grouping**: Chats organized by Today, Yesterday, Last Week, etc.
- **Collapsible Design**: Toggle sidebar for more chat space
- **User Profile**: Display user information and settings
- **Quick Actions**: New chat, delete all, settings buttons

### Dual AI Provider Support
- **Seamless Switching**: Change between OpenAI and Gemini models
- **Provider Indicators**: Visual badges showing which AI provider
- **Smart Routing**: Automatic API routing based on selected model

### Enhanced UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Beautiful dark mode interface
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Proper loading indicators and skeletons

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```env
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
NEXTAUTH_SECRET=your_production_secret_here
```

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - feel free to use this for your own projects!

## 🆘 Support & Issues

If you encounter any issues:

1. Check that your API keys are correctly set
2. Ensure you have billing enabled for OpenAI
3. Verify Google AI API is enabled
4. Check the console for error messages

For more help, please open an issue in the repository.

---

**Built with ❤️ using Next.js, OpenAI, and Google Gemini**