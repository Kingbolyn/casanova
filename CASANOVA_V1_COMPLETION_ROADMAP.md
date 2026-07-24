# CasaNova Version 1.0 — Definitive Completion Roadmap
## Comprehensive Product, Engineering & Execution Assessment

---

**Classification:** Master Execution Plan  
**Authority:** CN-025 Master Constitution  
**Version:** 1.0  
**Date:** 2026-07-24  
**Prepared by:** King (Apex Code Studio) + Claude Code (Sonnet 4.6)  
**Status:** ACTIVE — All remaining work derives from this document

---

## Executive Summary

CasaNova has completed Phase 1 through Phase 8 of its engineering lifecycle. PB-006 Release Certification (2026-07-24) issued a CERTIFIED WITH ACCEPTED CONDITIONS decision, meaning the product is live and technically sound, but two formally accepted conditions and a set of product completeness gaps remain between the current build and an unconditional Version 1.0 production release.

This roadmap is the authoritative record of everything that stands between the current state and that unconditional release.

**Current Version 1.0 Completion: 72%**

---

## Current State Inventory

### What Is Complete (Phase 1–8)

- Full design token system (CN-017) — single source of truth
- Component library — Typography, Button, Input, Textarea, Section, Container, Heading, Body, Tag, Card
- Motion language system — page transitions, section reveals, component animations, stagger sequences
- Photography-first visual language — all Unsplash hero and property images integrated
- Navigation system — Navbar with scroll-aware behaviour, mobile drawer, search overlay, focus management
- Homepage — hero, statistics block, featured properties, philosophy section, trust section, collection teasers, testimonials, CTA
- Properties page — 12 properties, real-time search, 7 filter dimensions, 6 sort modes, grid/list toggle, mobile filter modal
- Individual property detail pages — gallery (lightbox + carousel), PanoramaViewer (Three.js 360°), description, specs, amenities, location placeholder, sticky enquiry form
- Collections page — 4 curated collections with property grids
- About page — philosophy, team, values
- Contact page — hero with supporting copy, trust signal, success state
- Footer — navigation, legal links, neighbourhood links (links to filtered views, not dedicated pages)
- 404 page — styled with brand language
- SEO — metadata on all pages, Open Graph, Twitter Card, Schema.org structured data (RealEstateListing, BreadcrumbList, Organization, WebSite), robots.ts, sitemap.ts
- Accessibility — WCAG 2.2 AA, keyboard navigation, focus management, ARIA, skip link
- Performance — desktop Lighthouse 95/96/100/100
- Deployment — Vercel production, GitHub CI/CD, HTTPS

---

## What Is Not Complete

The following 19 tasks constitute the remaining Version 1.0 work. They are organized into 5 phases of execution, ordered by dependency and risk.

---

## Phase 9A — Performance & Correctness

*Fix the two formally accepted conditions from PB-006 and correct three data accuracy issues.*

---

### TASK-001 — LazyMotion Bundle Optimization

**Title:** Replace full Framer Motion bundle with LazyMotion + dynamic features

**Description:** In `app/layout.tsx`, replace all `import { motion }` with `import { m }` from `framer-motion`, then wrap the root layout's `<body>` in `<LazyMotion features={loadFeatures} strict>` where `loadFeatures` is a dynamic import of `domAnimation` from `framer-motion/features`. Update all component files to use `m.div`, `m.section`, etc. in place of `motion.div`, `motion.section`. The AnimatePresence import remains unchanged.

**Why it matters:** The current Framer Motion bundle is 130KB. Under Lighthouse 4x CPU throttle (simulated mid-range mobile), it takes 4,529ms to parse. This is the sole reason mobile Performance is 52. LazyMotion with dynamic features reduces the bundle to approximately 18–45KB. Projected mobile Performance score post-fix: 75–85. This is the single largest quality gap remaining in the product and is documented as AC-001 in PB-006.

**Dependencies:** None. This is the first task.

**Complexity:** Medium  
**Priority:** Critical  
**Phase:** 9A

**Files affected:**
- `app/layout.tsx` — add LazyMotion wrapper
- Every component that imports `motion` from `framer-motion` — swap to `m` import

**Estimated effort:** 4–6 hours

---

### TASK-002 — Hero H1 Screen Reader Text Fix

**Title:** Add space before `<br><em>` in HeroSection headline

**Description:** In `components/sections/HeroSection.tsx`, the headline renders as:

```tsx
Find the home<br /><em>you imagined.</em>
```

`<br>` does not produce a space in `textContent`. Screen readers concatenate "Find the homeyou imagined." — a real speech defect. Fix: insert `{' '}` before the `<br />`.

```tsx
Find the home{' '}<br /><em>you imagined.</em>
```

**Why it matters:** This is a speech accessibility defect, not a cosmetic one. A visitor using a screen reader hears a malformed sentence at the first moment of brand contact. The product's governing emotion is "Seen. Heard. Understood." — failure at the h1 contradicts this directly.

**Dependencies:** None.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9A

**Files affected:** `components/sections/HeroSection.tsx`

**Estimated effort:** 10 minutes

---

### TASK-003 — Sitemap Canonical Domain Fix

**Title:** Replace hardcoded Vercel URL in sitemap.ts with BASE_URL constant

**Description:** `app/sitemap.ts` contains `const BASE = 'https://casanova-pied.vercel.app'`. This URL is the Vercel preview deployment, not the canonical production domain. It should use `BASE_URL` from `lib/seo.ts` which is the authoritative domain constant.

```ts
// Before:
const BASE = 'https://casanova-pied.vercel.app'

// After:
import { BASE_URL } from '@/lib/seo'
const BASE = BASE_URL
```

**Why it matters:** Google indexes the sitemap URL as the canonical location for every page. If the sitemap declares `casanova-pied.vercel.app` and the real domain is different, all crawl signals are split between two origins. This directly harms SEO.

**Dependencies:** None. Verify `BASE_URL` value in `lib/seo.ts` is correct before deploying.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9A

**Files affected:** `app/sitemap.ts`

**Estimated effort:** 15 minutes

---

### TASK-004 — Property Statistics DOM Audit and Fix

**Title:** Verify property detail spec numbers render in accessible markup

**Description:** The property detail page (`app/property/[id]/page.tsx`) renders a specs section with bedroom count, bathroom count, area, and price. A DOM audit during PB-006 showed that label text was present but the numeric values may not have been readable in a text-content query. Audit using `document.querySelectorAll('[data-spec] .spec-value')` or equivalent. If numbers are rendered in `aria-hidden` spans or as CSS `::before`/`::after` content, correct them to visible accessible text.

**Why it matters:** Property specifications (bedrooms, area, price) are primary decision-making data for buyers. If they are inaccessible to screen readers or fail to render in certain environments, the product fails at its core mission on the individual property page.

**Dependencies:** None.

**Complexity:** Small  
**Priority:** Medium  
**Phase:** 9A

**Files affected:** `app/property/[id]/page.tsx`, `components/property/PropertySpecs.tsx` (if exists)

**Estimated effort:** 1–2 hours

---

## Phase 9B — Legal & Compliance

*Before any marketing push or real users, the product must have its legal pages and GDPR compliance in place.*

---

### TASK-005 — Privacy Policy Page

**Title:** Create `/privacy` page with CasaNova Privacy Policy

**Description:** The footer renders a `<Link href="/privacy">` that currently returns 404. Create `app/(marketing)/privacy/page.tsx` with a full privacy policy document. Content must cover: data collected (name, email, phone from forms), purpose of collection (enquiry handling), data storage (no current backend, future Node.js/PostgreSQL per CN-018), cookies used, third-party services (Vercel, Unsplash), user rights (access, correction, deletion), contact method for privacy requests, effective date.

Page must use the standard `Section` + `Container` layout system, `Heading` and `Body` typography components, and match the design language of the About page (prose layout, white background, consistent spacing).

**Why it matters:** Any website that collects personal information (even via a contact form) is legally required to publish a privacy policy in virtually every jurisdiction. Without this, the product is non-compliant before a single user makes an enquiry. Footer links to a 404 also degrade trust precisely at the moment a visitor is evaluating whether to trust the brand.

**Dependencies:** None. Can be written as static content.

**Complexity:** Medium  
**Priority:** Critical  
**Phase:** 9B

**Files affected:** `app/(marketing)/privacy/page.tsx` (new)

**Estimated effort:** 3–4 hours (including content writing)

---

### TASK-006 — Terms of Service Page

**Title:** Create `/terms` page with CasaNova Terms of Service

**Description:** The footer renders a `<Link href="/terms">` that returns 404. Create `app/(marketing)/terms/page.tsx` with terms of service covering: scope of the website (property listing and enquiry, not legal transaction), limitation of liability, intellectual property, user conduct on enquiry forms, disclaimer on property availability and pricing (illustrative only), governing law. Same layout and typography system as TASK-005.

**Why it matters:** Without terms of service, there is no legal framework governing how the site may be used, no liability limitation, and no intellectual property protection for CasaNova's content. As a commercial asset intended for acquisition (per the Apex Acquisition Model), absence of legal pages reduces perceived product maturity and raises due diligence concerns.

**Dependencies:** TASK-005 (write both at the same time for consistency).

**Complexity:** Medium  
**Priority:** Critical  
**Phase:** 9B

**Files affected:** `app/(marketing)/terms/page.tsx` (new)

**Estimated effort:** 2–3 hours

---

### TASK-007 — Cookie Policy Page

**Title:** Create `/cookies` page with cookie usage disclosure

**Description:** The footer renders a `<Link href="/cookies">` that returns 404. Create `app/(marketing)/cookies/page.tsx` describing cookies set by the site: functional cookies (if any), analytics cookies (Google Analytics, if added in TASK-011), third-party cookies (Vercel edge, Unsplash CDN). Table format: Cookie name, Purpose, Duration, Type (Essential / Analytics / Marketing). Link from this page to TASK-005 Privacy Policy.

**Why it matters:** GDPR and the UK PECR require disclosure of all cookies before they are set. The Cookie Policy page is the reference document that the cookie consent banner (TASK-008) links to. Without it, the consent system is incomplete.

**Dependencies:** TASK-005, TASK-008.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9B

**Files affected:** `app/(marketing)/cookies/page.tsx` (new)

**Estimated effort:** 1–2 hours

---

### TASK-008 — Cookie Consent Banner

**Title:** Implement GDPR-compliant cookie consent system

**Description:** Add a cookie consent banner that appears on first visit for users in GDPR/PECR jurisdictions. Banner must: show on first load at the bottom of the viewport; offer Accept All and Decline Non-Essential buttons; persist the choice in localStorage (key: `casanova_consent`); suppress analytics loading until consent is given; provide a link to the Cookie Policy (TASK-007). The banner must match the visual language — stone background, minimal typography, no harsh borders. On scroll lock or lightbox open, banner must remain visible (z-index above overlay but below modal).

Use a client component `components/ui/CookieConsent.tsx` rendered in `app/layout.tsx`. No external cookie consent library is required — this is implementable with ~80 lines of React.

**Why it matters:** Any product that sets cookies for analytics (TASK-011) on European users requires prior informed consent under GDPR Article 6 and the UK PECR. Absent consent management, analytics tags must not fire. This is a legal requirement, not a preference. It also applies to any future retargeting or third-party embeds.

**Dependencies:** TASK-007 (the banner links to the cookie page). Can be built before TASK-007 is live, with the link pending.

**Complexity:** Medium  
**Priority:** Critical  
**Phase:** 9B

**Files affected:**  
- `components/ui/CookieConsent.tsx` (new)  
- `app/layout.tsx` — add `<CookieConsent />` after `<Footer />`

**Estimated effort:** 4–6 hours

---

## Phase 9C — Product Completeness

*Two major product features are architecturally present but have no user-facing pages.*

---

### TASK-009 — Neighbourhood Pages

**Title:** Build 6 individual neighbourhood destination pages

**Description:** `lib/data/neighbourhoods.ts` defines 6 fully specified neighbourhood records (Victoria Island, Banana Island, Ikoyi, Lekki, Maitama, Asokoro) with slug, hero image, lifestyle summary, long description, and associated property IDs. No route exists. Create:

```
app/(marketing)/neighbourhoods/[slug]/page.tsx
```

Each page must render:
- Hero section: dark overlay on neighbourhood hero image, neighbourhood name as h1, lifestyle summary as subheading
- Introduction: long description content
- Lifestyle tags: rendered as Tag components
- Featured properties: filtered from the property data by neighbourhood using the slug
- CTA: "Explore All Properties" button linking to `/properties?neighbourhood=[slug]`

Also create:
```
app/(marketing)/neighbourhoods/page.tsx
```

A neighbourhood index page listing all 6 neighbourhoods in a grid with hero image, name, and property count. Link this page from the footer's "Neighbourhoods" section header if one exists.

Generate static params for all 6 slugs.

**Why it matters:** Neighbourhood discovery is a primary search behaviour for luxury property buyers — they choose a lifestyle before they choose a specific unit. The information architecture specification (CN-010) identifies neighbourhood as a first-level navigation concept. Having neighbourhood data without neighbourhood pages means a significant portion of the product's SEO potential is unrealised, and the "local expertise" brand claim has no supporting content.

**Dependencies:** `lib/data/neighbourhoods.ts` (exists), property data associations (exists).

**Complexity:** Large  
**Priority:** Critical  
**Phase:** 9C

**Files affected:**  
- `app/(marketing)/neighbourhoods/page.tsx` (new)  
- `app/(marketing)/neighbourhoods/[slug]/page.tsx` (new)  
- `app/sitemap.ts` — add neighbourhood URLs

**Estimated effort:** 1–2 days

---

### TASK-010 — Analytics Integration

**Title:** Implement privacy-respecting analytics via Google Analytics 4

**Description:** Add Google Analytics 4 via Next.js `<Script>` in `app/layout.tsx`. The script tag must be conditional on consent state from TASK-008 — it must not fire until `casanova_consent === 'accepted'` in localStorage. Use `next/script` with `strategy="afterInteractive"`. Add a `gtag` event for property detail views and enquiry form submissions. Store the GA4 Measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable. Document the variable in `.env.example`.

**Why it matters:** Without analytics, there is no way to know how users navigate the product, which properties attract the most interest, where visitors drop off in the enquiry funnel, or whether marketing efforts are working. As a commercial asset, the ability to demonstrate user engagement data is a meaningful component of valuation.

**Dependencies:** TASK-008 (consent must gate analytics loading). TASK-011 depends on this.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9C

**Files affected:**  
- `app/layout.tsx`  
- `.env.example` (new or update)  
- `.env.local` (user must create)

**Estimated effort:** 2–4 hours

---

### TASK-011 — Enquiry Form Backend Integration

**Title:** Replace form stubs with real email delivery via Resend

**Description:** Both `components/property/EnquiryForm.tsx` and `app/(marketing)/contact/ContactForm.tsx` use `setTimeout` to simulate submission. They never deliver an enquiry.

Create a Next.js API Route at `app/api/enquiry/route.ts` using Resend (resend.com) with the free tier (3,000 emails/month). The route must:
- Accept POST with `{ name, email, phone, message, propertyId?, propertyTitle? }`
- Validate required fields (name, email, message)
- Send an email to `kingbolyn1@gmail.com` with formatted enquiry details
- Send a confirmation email to the visitor
- Return `{ success: true }` or `{ error: string }` with appropriate HTTP status

Update both form components to `fetch('/api/enquiry', { method: 'POST', body: ... })` and handle real success and error states.

Store `RESEND_API_KEY` in environment variables. Document in `.env.example`.

**Why it matters:** The current forms deliver zero enquiries. Every visitor who submits a contact form believes they have made contact. No email is sent. If CasaNova is used to demonstrate to a potential buyer or client, a submitted form that results in no delivery is an immediate product credibility failure. This is the highest-impact gap for real-world product readiness.

**Dependencies:** TASK-005 (privacy policy should exist before collecting form data), Resend account and API key.

**Complexity:** Large  
**Priority:** Critical  
**Phase:** 9C

**Files affected:**  
- `app/api/enquiry/route.ts` (new)  
- `components/property/EnquiryForm.tsx`  
- `app/(marketing)/contact/ContactForm.tsx`  
- `.env.example`

**Estimated effort:** 1 day

---

## Phase 9D — Geographic Accuracy & Localization

*CasaNova lists properties in Nigeria. Current data and UI reflect no Nigerian context.*

---

### TASK-012 — Nigerian Naira Pricing

**Title:** Convert property pricing display from USD to NGN (₦)

**Description:** Property data currently stores prices as USD integers (e.g., `price: 4500000`). Property cards and detail pages display these with a dollar sign or generic formatting. Update to Nigerian Naira:

1. In `lib/data/properties.ts`, audit all price values — determine if they are already in NGN or USD and update accordingly to realistic NGN luxury property values (approx ₦800M–₦10B range for the featured tier).
2. Create a utility function `lib/utils/formatPrice.ts` that formats as `₦1.2B` or `₦850M` for card display and `₦1,200,000,000` for detail page.
3. Update all price rendering locations: property card, property detail page header, filter range if applicable.

**Why it matters:** A Nigerian luxury property platform displaying USD prices is a factual inaccuracy that undermines credibility with the target market (HNWI in Lagos and Abuja). It signals that the product was not built with the market in mind. Any prospective client, investor, or acquirer reviewing the product will note this immediately.

**Dependencies:** None. Fully self-contained.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9D

**Files affected:**  
- `lib/data/properties.ts`  
- `lib/utils/formatPrice.ts` (new)  
- Property card component  
- `app/property/[id]/page.tsx`

**Estimated effort:** 3–5 hours

---

### TASK-013 — Nigerian Phone Number Format on Contact Form

**Title:** Add Nigerian phone number format hint to contact and enquiry forms

**Description:** The contact form and enquiry form both have a phone field with no format guidance. Add placeholder text `+234 800 000 0000` and a format hint below the field. This is a small but telling signal of geographic accuracy.

**Why it matters:** Small details of geographic specificity build trust in a luxury market. A phone field that defaults to generic international format when all clients are Nigerian signals a product that does not know its audience.

**Dependencies:** TASK-011.

**Complexity:** Small  
**Priority:** Low  
**Phase:** 9D

**Files affected:**  
- `components/property/EnquiryForm.tsx`  
- `app/(marketing)/contact/ContactForm.tsx`

**Estimated effort:** 30 minutes

---

### TASK-014 — Map Integration (Property Location)

**Title:** Replace map placeholder with embedded map on property detail pages

**Description:** `app/property/[id]/page.tsx` renders a `<div role="img">` with an SVG pin icon and text as the "Location" section. This is a placeholder. Integrate an actual map using one of:

**Option A (Recommended):** Mapbox GL JS embedded via the free tier (50,000 map loads/month). Add `NEXT_PUBLIC_MAPBOX_TOKEN` env variable. Create `components/property/PropertyMap.tsx` as a `dynamic` import with `ssr: false`. Render a dark-style Mapbox map centred on the property's lat/long coordinates. Style must match the product's restrained aesthetic — dark basemap, single pin.

**Option B:** Google Maps embed (no API key required for basic embed, but lacks styling control).

Each property record in `lib/data/properties.ts` must have `lat` and `lng` coordinates added.

**Why it matters:** The property detail page's location section is currently a visual lie — it shows a pin icon implying geographic context while providing none. For a luxury property platform, location is the second most important attribute after price. Buyers consult maps to assess proximity to schools, business districts, and airports. The current placeholder fails this expectation completely.

**Dependencies:** None for setup. Coordinates must be added to property data.

**Complexity:** Large  
**Priority:** High  
**Phase:** 9D

**Files affected:**  
- `lib/data/properties.ts` — add lat/lng to each property  
- `components/property/PropertyMap.tsx` (new)  
- `app/property/[id]/page.tsx` — replace placeholder  
- `.env.example`

**Estimated effort:** 1–1.5 days

---

## Phase 9E — Polish & Experience Refinement

*Final-mile improvements that elevate the product from complete to distinguished.*

---

### TASK-015 — PanoramaViewer Mobile Touch Gestures

**Title:** Add pinch-to-zoom and touch drag to the 360° PanoramaViewer

**Description:** `components/property/PanoramaViewer.tsx` currently handles navigation via pointer events only (`pointerdown`, `pointermove`, `pointerup`). On mobile, touch drag works because browsers translate touch to pointer events. However, pinch-to-zoom (two-finger spread) is not implemented. Add a `touchstart`/`touchmove` handler that detects two-touch events and adjusts the camera's field of view proportionally (zoom in on pinch-in, zoom out on pinch-out). Clamp FOV between 40° and 100°.

**Why it matters:** The PanoramaViewer is the product's single most distinctive experiential feature. It represents the "Immersion" stage of the 5-stage visitor journey. On mobile, which accounts for the majority of real-estate browsing traffic in Nigeria, an inability to zoom within a 360° tour is a significant UX gap. The feature is architecturally present but physically incomplete for the primary viewing device.

**Dependencies:** None.

**Complexity:** Small  
**Priority:** Medium  
**Phase:** 9E

**Files affected:** `components/property/PanoramaViewer.tsx`

**Estimated effort:** 3–4 hours

---

### TASK-016 — Contact Page Two-Column Desktop Layout

**Title:** Add contact details column alongside the contact form on desktop

**Description:** `app/(marketing)/contact/page.tsx` currently renders just the form in a narrow container. On `md:` and above, extend the form section to two columns: the left column (2/3 width) contains the form, the right column (1/3 width) contains:
- Phone number: `+234 (0) 800 123 4567`
- Email: `hello@casanova.ng`
- Physical address: Lagos office placeholder
- Office hours: Monday–Friday, 9am–6pm WAT

This removes the dependency on the footer for all contact information and provides context that builds trust at the decision stage.

**Dependencies:** TASK-011 (verify correct contact info before displaying).

**Complexity:** Small  
**Priority:** Low  
**Phase:** 9E

**Files affected:** `app/(marketing)/contact/page.tsx`

**Estimated effort:** 2 hours

---

### TASK-017 — Neighbourhood Links in Footer

**Title:** Update footer neighbourhood links to navigate to dedicated neighbourhood pages

**Description:** The Footer currently links `/properties?neighbourhood=victoria-island` etc. These links take the user to the filtered properties grid, which works but is not a neighbourhood destination. Once TASK-009 creates the neighbourhood pages, update footer links to `/neighbourhoods/victoria-island` etc.

**Dependencies:** TASK-009.

**Complexity:** Small  
**Priority:** Medium  
**Phase:** 9E

**Files affected:** `components/layout/Footer.tsx`

**Estimated effort:** 30 minutes

---

### TASK-018 — Sitemap — Add Neighbourhood and Legal Pages

**Title:** Add all new pages to sitemap.ts

**Description:** Once TASK-005 through TASK-009 are complete, update `app/sitemap.ts` to include:
- `/privacy`
- `/terms`
- `/cookies`
- `/neighbourhoods`
- `/neighbourhoods/victoria-island`
- `/neighbourhoods/banana-island`
- `/neighbourhoods/ikoyi`
- `/neighbourhoods/lekki`
- `/neighbourhoods/maitama`
- `/neighbourhoods/asokoro`

Use `changeFrequency: 'yearly'` for legal pages and `changeFrequency: 'monthly'` for neighbourhood pages with `priority: 0.7`.

**Dependencies:** TASK-003, TASK-005, TASK-006, TASK-007, TASK-009.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9E

**Files affected:** `app/sitemap.ts`

**Estimated effort:** 30 minutes

---

### TASK-019 — Production Environment Variables Audit

**Title:** Audit and document all required environment variables

**Description:** Create or update `.env.example` with all variables needed for a clean production deployment:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_MAPBOX_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Verify Vercel production environment has all required variables set before Phase 9C/9D features go live. Document in the project README that `.env.local` must be populated before local development of backend features.

**Why it matters:** Environment variable gaps cause silent failures at deployment. The form stub currently masks this — once real integration is live, a missing `RESEND_API_KEY` results in no enquiries being delivered with no visible error to the user.

**Dependencies:** TASK-010, TASK-011, TASK-014.

**Complexity:** Small  
**Priority:** High  
**Phase:** 9E

**Files affected:** `.env.example` (new/update), `README.md`

**Estimated effort:** 1 hour

---

## Complete Execution Order

Tasks should be executed in this exact sequence to respect dependencies and minimise rework:

```
Phase 9A — Performance & Correctness
  1. TASK-001  LazyMotion optimization              Critical  Medium   4–6h
  2. TASK-002  Hero H1 screen reader fix            High      Small    0.2h
  3. TASK-003  Sitemap canonical URL                High      Small    0.3h
  4. TASK-004  Property stats DOM audit             Medium    Small    2h
  → Deploy Phase 9A. Verify mobile Lighthouse score.

Phase 9B — Legal & Compliance
  5. TASK-005  Privacy Policy page                  Critical  Medium   4h
  6. TASK-006  Terms of Service page                Critical  Medium   3h
  7. TASK-007  Cookie Policy page                   High      Small    2h
  8. TASK-008  Cookie Consent banner                Critical  Medium   6h
  → Deploy Phase 9B. Verify legal pages live and consent banner fires.

Phase 9C — Product Completeness
  9. TASK-011  Enquiry form backend (Resend)        Critical  Large    8h
  10. TASK-010  Analytics GA4                       High      Small    4h
  11. TASK-009  Neighbourhood pages (6)             Critical  Large    12h
  → Deploy Phase 9C. Test form delivery end-to-end. Verify neighbourhood routes.

Phase 9D — Geographic Accuracy
  12. TASK-012  NGN pricing                         High      Small    5h
  13. TASK-014  Map integration (Mapbox)            High      Large    10h
  14. TASK-013  Phone number format                 Low       Small    0.5h
  → Deploy Phase 9D. Verify map renders with real coordinates.

Phase 9E — Polish & Completion
  15. TASK-015  PanoramaViewer touch gestures       Medium    Small    4h
  16. TASK-016  Contact page two-column layout      Low       Small    2h
  17. TASK-017  Footer neighbourhood links          Medium    Small    0.5h
  18. TASK-018  Sitemap — add all new pages         High      Small    0.5h
  19. TASK-019  Environment variables audit         High      Small    1h
  → Deploy Phase 9E. Run full PB-001 through PB-006 re-audit.
```

---

## Effort Summary

| Phase | Tasks | Estimated Hours | Estimated Days |
|---|---|---|---|
| 9A — Performance & Correctness | 4 | 8–10h | 1–1.5 days |
| 9B — Legal & Compliance | 4 | 14–16h | 2 days |
| 9C — Product Completeness | 3 | 24–26h | 3–3.5 days |
| 9D — Geographic Accuracy | 3 | 15–16h | 2 days |
| 9E — Polish & Completion | 5 | 8–9h | 1 day |
| **Total** | **19** | **69–77h** | **9.5–11 days** |

---

## Completion Percentage Assessment

| Domain | Complete | Remaining | % Done |
|---|---|---|---|
| Engineering Foundation | 100% | 0% | 100% |
| Design System | 100% | 0% | 100% |
| Component Library | 100% | 0% | 100% |
| Homepage Experience | 100% | 0% | 100% |
| Properties Page | 100% | 0% | 100% |
| Property Detail Pages | 85% | Map placeholder (15%) | 85% |
| Neighbourhood Pages | 0% | All 6 pages (100%) | 0% |
| Legal Pages | 0% | All 3 pages (100%) | 0% |
| Contact & Forms | 60% | Real backend (40%) | 60% |
| GDPR / Cookie Consent | 0% | Full implementation | 0% |
| Analytics | 0% | GA4 integration | 0% |
| Geographic Accuracy | 30% | NGN pricing, maps | 30% |
| Performance (Mobile) | 52% | LazyMotion fix | 52% |
| Accessibility | 98% | H1 space fix | 98% |
| SEO | 90% | Sitemap URL, new pages | 90% |
| **Overall Version 1.0** | **72%** | **28% remaining** | **72%** |

---

## Highest-Risk Remaining Work

Risks are ranked by likelihood × consequence.

**Risk 1 — TASK-011 Form Backend** (Critical Risk)  
Forms are currently delivering zero enquiries. Every test submission by a potential client, investor, or acquirer goes nowhere. If the product is demonstrated before this is fixed, one form submission exposes the stub. This is the highest consequence gap.

**Risk 2 — TASK-009 Neighbourhood Pages** (High Risk)  
This is the largest single implementation task. 8 route pages (index + 6 neighbourhoods + error state), with content, layout, SEO metadata, and property associations. Scope creep risk is real — content quality matters more here than on structured pages.

**Risk 3 — TASK-014 Map Integration** (High Risk)  
Mapbox GL JS adds a third-party JavaScript dependency and requires coordinate data for all 12 properties. If coordinates are inaccurate, the map actively misleads buyers. If the Mapbox bundle is large, it could introduce a new performance regression. Must be lazy-loaded and size-audited before deployment.

**Risk 4 — TASK-008 Cookie Consent** (Medium Risk)  
Cookie consent UI is deceptively simple to build and easy to get wrong. A banner that fires on every page load despite accepted consent, or one that fails to block analytics until consent is given, creates a worse experience than no banner. State persistence and the consent-gating logic require careful testing.

**Risk 5 — TASK-001 LazyMotion** (Medium Risk)  
The LazyMotion swap touches every component that uses Framer Motion. A missed `motion.` import that is not converted to `m.` will fail silently in development (Framer Motion degrades gracefully) but will re-inflate the bundle in production. A systematic find-and-replace with post-build bundle analysis is required.

---

## Top 5 Tasks — Highest Immediate Impact

In order of impact on real-world product readiness:

1. **TASK-011 — Enquiry Form Backend** — Converts the product from a demonstrator into a functional lead-generation system. Without this, nothing real happens when a visitor takes action.

2. **TASK-001 — LazyMotion Optimization** — Resolves the only significant technical quality gap (mobile Performance 52). Directly affects every mobile visitor's experience.

3. **TASK-009 — Neighbourhood Pages** — Adds the product's most SEO-significant content surface. Luxury buyers search by neighbourhood. These pages have the highest organic acquisition potential of any remaining work.

4. **TASK-005 + TASK-006 + TASK-007 — Legal Pages** — Three tasks but one deliverable. Without legal pages, the product cannot be used commercially or shared with clients without legal exposure.

5. **TASK-008 — Cookie Consent Banner** — Required before analytics (TASK-010) can be activated. Blocks the analytics data needed to understand user behaviour.

---

## Phase 8 Recommendation

**Phase 8 is complete and should not be reopened.**

The Phase 8 certification (PB-006, 2026-07-24) was issued with accepted conditions. Those conditions do not invalidate Phase 8 — they are formally accepted, documented, and resolved by the Phase 9 work described above.

Phase 9 is the correct designation for all remaining work. It consists of five sequential sub-phases (9A through 9E) that together constitute the path from 72% complete to an unconditional Version 1.0 release.

**Recommendation:** Begin Phase 9A immediately. It contains four tasks with zero dependencies, and TASK-001 (LazyMotion) resolves the product's only outstanding technical quality condition. Phase 9A can be completed in a single session. Legal (9B) and Product (9C) phases require more content work and can be run in subsequent sessions. The full Phase 9 programme is estimated at 9.5–11 engineering days.

Upon completion of all 19 tasks and a re-run of PB-001 through PB-006 audits with passing results, the product will be eligible for unconditional Version 1.0 release certification.

---

## Version Control

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-24 | Initial roadmap issued. 19 tasks, 5 phases, 72% completion baseline. |

---

**Classification:** Master Execution Plan — Version 1.0  
**Authority:** CN-025 Master Constitution  
**Next Review:** Upon completion of Phase 9A  
**Archive:** C:\Users\user\Downloads\APEXCODEPRINCIPLE\CASANOVA_V1_COMPLETION_ROADMAP.md
