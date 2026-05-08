# WordFlow - AI Content Generator

WordFlow is a powerful AI-driven SaaS that helps you generate high-quality content for your blogs, social media, and more.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (Latest version)
- **Auth**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase PostgreSQL](https://supabase.com/database)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Models**: ChatGPT, Claude, Gemini, Deepseek (Integration ready)
- **Payments**: Stripe (Integration ready)

## Project Features
- **Dashboard**: Track your monthly usage and remaining words.
- **Editor**: Generate content with customizable keywords, intent, tone, language, and length.
- **Billing**: Manage your subscription plans (Free, Pro, Business).
- **Modern UI**: Card-based design with Poppins font and WordFlow's primary color #252961.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Database Setup**:
   Run the SQL provided in `supabase_schema.sql` in your Supabase SQL Editor.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Business Logic
- **Free**: 1,000 words/month ($0)
- **Pro**: 10,000 words/month ($10)
- **Business**: 100,000 words/month ($18)
