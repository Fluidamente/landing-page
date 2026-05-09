# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start development server
yarn build        # Production build
yarn lint         # ESLint
yarn typecheck    # TypeScript type checking (no emit)
yarn format       # Prettier (formats all files)
```

Commits are enforced by commitlint with Conventional Commits (`feat:`, `fix:`, `chore:`, etc.). Husky runs lint-staged (format + ESLint) on pre-commit.

## Architecture

This is a **Next.js 14 App Router** landing page for "Fluidamente" (a psychology/online courses brand), written in TypeScript with Tailwind CSS and NextUI components.

### Routing

- `/` — Main landing page (`src/app/page.tsx`) — assembles all section components in order
- `/blog` — Renders `<UnderConstruction />` (placeholder)
- `/cursos` — Renders `<UnderConstruction />` (placeholder)

The `(routes)` folder uses a Next.js route group; `layout.tsx` wraps everything with `<NavbarApp>` and `<Providers>`.

### Components (`src/app/_components/`)

Each section of the landing page is a self-contained component folder:

- `HeroSection` — hero banner with background image
- `AboutMe` — about section
- `Services` / `ServiceCard` — services grid
- `Testimonials` / `TestimonialItem` — testimonials with constants in `Testimonials.constants.ts`
- `CallToAction` — CTA section
- `ContactForm` — form with Yup validation (`schema.ts`) + `react-hook-form` + calls `sendMail` server action
- `NavbarApp` — site navigation
- `UnderConstruction` — placeholder for unfinished pages

### Server Actions & Email

`src/lib/mail.ts` is a Next.js Server Action (`"use server"`) that sends emails via Gmail/nodemailer. It requires two environment variables in `.env.local`:

```
SMTP_EMAIL=
SMTP_PASSWORD=
```

The email HTML is built with Handlebars from `src/lib/templates/contact.ts`.

### Styling

- **Tailwind CSS** with custom theme colors: `primary` (`#247E7F`), `secondary` (`#3B4B62`), `tertiary` (`#97D1DB`)
- Fonts: `--font-poppins` (body) and `--font-raleway` (headings), loaded via `next/font/google`
- **NextUI** v2 component library (configured via `nextui()` Tailwind plugin)
- **Framer Motion** for animations
- `sonner` `<Toaster>` for toast notifications (mounted in `Providers`)

### Providers

`src/app/utils/providers.tsx` wraps the app with `NextUIProvider` and renders the `Toaster`. All client-side global context lives here.
