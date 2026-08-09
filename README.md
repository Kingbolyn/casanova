# CasaNova

Luxury real estate platform for the Nigerian market. Built on Next.js 16, deployed on Vercel.

**Live:** `https://casanova.ng` (target domain)  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion 12 · Resend

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY and CONTACT_EMAIL — see .env.example for all variables

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

All variables are documented in [`.env.example`](.env.example).

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Transactional email via Resend |
| `CONTACT_EMAIL` | Yes | Destination address for form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL and OG metadata |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Sprint 2 | Google Analytics 4 |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Sprint 2 | Interactive map tiles (replaces OSM embed) |

**Security rule:** `RESEND_API_KEY` is server-only. It must never appear in client-side code or be prefixed `NEXT_PUBLIC_`.

---

## Project Structure

```
app/
  (marketing)/         — Public-facing pages (home, about, contact, etc.)
  property/[id]/       — Individual property detail pages
  api/
    contact/           — Contact form API route (POST)
    enquiry/           — Property enquiry API route (POST)
components/
  layout/              — Navbar, Footer, Breadcrumb, Section, Container
  property/            — PropertyGallery, PropertyMap, EnquiryForm, etc.
  sections/            — Page-level section components (HeroSection, etc.)
  ui/                  — Primitive UI components (Button, Typography, Input, etc.)
  motion/              — Animation wrappers (FadeIn, LazyMotion provider)
lib/
  data/                — Static property and neighbourhood data
  types/               — Shared TypeScript types
  hooks/               — Custom React hooks
  motion.ts            — Framer Motion duration and easing constants
  seo.ts               — Canonical URL and metadata helpers
styles/
  tokens.css           — Design token definitions (colours, type, spacing)
  globals.css          — Global styles, Tailwind directives, component classes
```

---

## Key Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build (runs TypeScript check + static generation)
npm run start      # Serve the production build locally
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript type-check only
```

---

## Architecture Notes

- **Static-first.** All property, neighbourhood, and collection pages are statically generated via `generateStaticParams`. The only server-rendered routes are the two API handlers.
- **No external map API key required.** Sprint 1 uses an OpenStreetMap iframe embed (`components/property/PropertyMap.tsx`). To upgrade to Mapbox in Sprint 2, only that file changes.
- **Email delivery.** The server-side API routes (`/api/contact`, `/api/enquiry`) send mail through Resend. The browser never touches the API key.
- **Reduced motion.** `useReducedMotion()` from Framer Motion gates all infinite/parallax JS animations. The global CSS `prefers-reduced-motion` rule handles CSS transitions only.
- **WCAG 2.2 AA.** Focus rings, touch targets (44px minimum), semantic landmark regions, and `aria-live` status messages are implemented throughout.

---

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the full Vercel deployment runbook.

---

## Sprint Status

| Sprint | Focus | Status |
|---|---|---|
| Sprint 1 | Foundation, forms, map, accessibility | Complete |
| Sprint 2 | Analytics, Mapbox, search, performance | Planned |
| Sprint 3 | CMS integration, authentication | Planned |

Full roadmap: `CA-004_Sprint_Execution_Plan` in `APEXCODEPRINCIPLE/`.
