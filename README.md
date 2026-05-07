# TOPIK Vocabulary Bootcamp

A premium, gamified Korean vocabulary learning platform focused on TOPIK learners.

## Features
- **14-Day Bootcamp**: Structured daily missions to achieve mastery.
- **Gamified Progression**: Rank system (Survivor to TOPIK Legend), XP, streaks, and badges.
- **Visual-First Learning**: Animated vocabulary cards with examples and pronunciation.
- **SRS Engine**: Spaced Repetition System (Modified SM-2) for long-term retention.
- **Final Challenge**: High-stakes "Boss Battle" on Day 15 with certificate rewards.
- **Multi-Language**: Full support for English and Chinese (UI & Meanings).
- **Admin Portal**: Comprehensive analytics and user management.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS v4, Framer Motion.
- **Backend/Auth**: Supabase.
- **Icons**: Lucide React.
- **Effects**: Canvas Confetti.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Supabase**:
   - Create a project on [Supabase](https://supabase.com).
   - Run the SQL schema provided in the `supabase_schema.sql` artifact.
   - Copy your `URL` and `ANON_KEY` to `.env.local`.

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000)

## Design Aesthetics
The app uses a modern Korean education aesthetic with:
- `oklch` color spaces for vibrant, consistent colors.
- Glassmorphism effects for premium cards.
- Smooth transitions and micro-animations via Framer Motion.
- Mobile-first responsiveness.
