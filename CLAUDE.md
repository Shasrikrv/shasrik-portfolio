# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
```

There are no tests or linting configured in this project.

## Architecture

This is a single-page Next.js 15 portfolio site for Shasrik Reddy Veerlapally. The entire site lives in two files:

- `app/page.tsx` — All content (projects, skills, experience) is defined as plain TypeScript arrays/objects at the top of the file and rendered in a single default export. No routing, no client components, no state.
- `app/layout.tsx` — Minimal root layout; only sets page `<title>` and `<meta description>`.

**Styling approach:** Tailwind utility classes for layout/spacing. Three reusable CSS classes defined in `globals.css` and used throughout `page.tsx`:
- `.gradient-text` — purple-to-cyan gradient applied to section headings and the hero `<h1>` span
- `.card` — dark frosted-glass card used for every content block
- `.orb` — fixed blurred circle for the ambient background glow effect

**Design tokens** live in `tailwind.config.ts`:
- `bg` (#070A12) — page background
- `card` (#0E1424) — card background base
- `accent` (#7C3AED) — purple accent (buttons, highlights)
- `shadow-glow` — purple box-shadow used on the hero card and CTA button

**Content updates:** All resume data (projects, skills, experience) is edited directly in the arrays at the top of `app/page.tsx`. The `Section` helper component (`id`, `title`, `children`) is used for every named section to keep nav anchor IDs consistent.
