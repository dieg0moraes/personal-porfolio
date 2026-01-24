# techbydie.dev

> A developer portfolio vibecoded with [Claude](https://claude.ai) - built through AI-assisted pair programming.

[![Live Demo](https://img.shields.io/badge/Live-techbydie.dev-00FF9D?style=for-the-badge)](https://techbydie.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## What is this?

This is my personal portfolio website, entirely **vibecoded** with Claude (Anthropic's AI assistant). Every component, every feature, and every line of code was developed through conversational AI-assisted programming - a testament to what's possible when human creativity meets AI capabilities.

## Features

### Terminal-Inspired Design
- Custom terminal aesthetic with typing animations
- Command-line inspired UI elements (`$ whoami`, `// COMMENTS`)
- Dark theme optimized for developers

### Thoughts System
A micro-blogging feature powered by Telegram:
- **Telegram Bot Integration**: Send messages to a Telegram bot to publish thoughts
- **Image Support**: Attach photos to thoughts via Telegram
- **Hashtag Parsing**: Automatic tag extraction from `#hashtags`
- **Real-time Publishing**: Instant feedback via Telegram messages
- **ISR (Incremental Static Regeneration)**: Fast page loads with 60s revalidation

### Animations & UX
- Scroll-triggered animations with custom hooks
- Staggered reveal effects on cards and sections
- Responsive design (mobile-first approach)
- Smooth transitions throughout

### SEO & Performance
- OpenGraph metadata for social sharing
- Dynamic metadata generation per page
- Optimized images with Next.js Image component
- Static generation where possible

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **Bot** | Telegram Bot API |
| **Deployment** | Vercel |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Home     │  │  Thoughts   │  │  Thought Detail     │  │
│  │   (SSG)     │  │   (ISR)     │  │      (ISR)          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        API ROUTES                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              /api/telegram/webhook                   │    │
│  │  • Validates authorized users                        │    │
│  │  • Parses messages (text + photos)                   │    │
│  │  • Uploads images to Supabase Storage                │    │
│  │  • Creates thoughts in database                      │    │
│  │  • Sends confirmation via Telegram                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    Supabase     │  │    Supabase     │  │    Telegram     │
│    Database     │  │    Storage      │  │    Bot API      │
│   (thoughts)    │  │ (thought-images)│  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home (Hero, About, Experience, Projects, Tech Stack)
│   ├── thoughts/
│   │   ├── page.tsx                # Thoughts listing
│   │   └── [slug]/page.tsx         # Individual thought
│   └── api/
│       └── telegram/
│           └── webhook/route.ts    # Telegram webhook handler
├── components/
│   ├── Hero.tsx                    # Landing section with typing animation
│   ├── About.tsx                   # About me section
│   ├── Experience.tsx              # Work experience timeline
│   ├── Projects.tsx                # Notable projects showcase
│   ├── TechStack.tsx               # Technologies grid
│   ├── ThoughtCard.tsx             # Thought preview card
│   ├── ThoughtTags.tsx             # Tag badges component
│   ├── TypingText.tsx              # Terminal typing animation
│   └── Footer.tsx                  # Footer with links
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Supabase client setup
│   │   └── queries.ts              # Database operations
│   ├── telegram/
│   │   ├── bot.ts                  # Telegram API functions
│   │   └── parser.ts               # Message parsing utilities
│   └── utils/
│       └── slug.ts                 # Slug generation
├── hooks/
│   └── useAnimateOnScroll.ts       # Intersection Observer hook
└── types/
    └── thought.ts                  # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account
- A Telegram Bot (create one via [@BotFather](https://t.me/botfather))

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_ALLOWED_USER_ID=your_telegram_user_id

# App
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  posted_to_x BOOLEAN DEFAULT false,
  x_post_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public can read published thoughts" ON thoughts
  FOR SELECT USING (is_published = true);
```

### Storage Setup

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `thought-images`
3. Set it as **Public**
4. Add an INSERT policy for authenticated/service role

### Installation

```bash
# Clone the repository
git clone https://github.com/dieg0moraes/portfolio-website.git

# Install dependencies
npm install

# Run development server
npm run dev
```

### Telegram Webhook

Set your webhook URL (replace with your domain):

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-domain.com/api/telegram/webhook"
```

## Deployment

This project is deployed on **Vercel** with automatic deployments from the main branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dieg0moraes/portfolio-website)

## The Vibecoding Experience

This entire project was built through conversations with Claude. From initial design decisions to complex features like the Telegram integration, every aspect emerged from collaborative AI-assisted development.

Key aspects of the vibecoding process:
- **Iterative Development**: Features evolved through back-and-forth discussions
- **Real-time Problem Solving**: Debugging and optimization done conversationally
- **Architecture Decisions**: System design discussed and refined with AI assistance
- **Code Quality**: Consistent patterns and best practices throughout

## License

MIT

---

Built with Claude | Deployed on Vercel | Data on Supabase
