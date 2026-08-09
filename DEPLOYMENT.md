# CasaNova — Deployment Runbook

Deployment target: **Vercel**. All commands run from the repository root.

---

## Pre-Deployment Checklist

Run these before every deployment:

```bash
npx tsc --noEmit    # Must exit 0 — zero type errors
npm run build       # Must compile all pages without error
npm run lint        # Must exit 0 — zero lint errors
```

All three must pass. Do not deploy a build with errors.

---

## First Deployment (New Project)

### 1. Create the GitHub Repository

A GitHub repository is required before first deployment. This is a permanent rule.

```bash
# From the project root
git init
git add .
git commit -m "Initial commit — CasaNova Sprint 1"
git remote add origin https://github.com/<your-org>/casanova.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `casanova` GitHub repository
3. Framework preset will auto-detect as **Next.js** — leave all defaults
4. Before clicking Deploy, configure environment variables (see below)

### 3. Configure Environment Variables in Vercel

In the Vercel project → **Settings → Environment Variables**, add:

| Name | Value | Environments |
|---|---|---|
| `RESEND_API_KEY` | `re_...` (your Resend API key) | Production, Preview |
| `CONTACT_EMAIL` | `hello@casanova.ng` | Production |
| `CONTACT_EMAIL` | your personal email | Preview (for testing) |
| `NEXT_PUBLIC_SITE_URL` | `https://casanova.ng` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://<preview-url>.vercel.app` | Preview |

**Security:** `RESEND_API_KEY` must be set to **Server** scope only (not Exposed to Browser). Vercel enforces this automatically for variables without the `NEXT_PUBLIC_` prefix.

### 4. Deploy

Click **Deploy**. Vercel will:
1. Install dependencies (`npm install`)
2. Run `npm run build`
3. Publish all 42 static pages to the CDN
4. Keep `/api/contact` and `/api/enquiry` as serverless functions

---

## Subsequent Deployments

Every push to `main` triggers an automatic Vercel deployment.

For manual deploys:

```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod
```

---

## Environment Variable Security Rules

1. `RESEND_API_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`.
2. `.env.local` must remain in `.gitignore`. Verify with `git status` before every push.
3. `.env.example` documents all variables with placeholder values. It is safe to commit.
4. When rotating the API key, update Vercel environment variables first, then redeploy.

---

## Domain Configuration

1. In Vercel project → **Settings → Domains**, add `casanova.ng`
2. Add the following DNS records at your registrar:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

3. Vercel will provision an SSL certificate automatically within minutes.

---

## Environment Variable Reference

| Variable | Required | Environment | Description |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | Production, Preview | Resend transactional email API key. Server-only. |
| `CONTACT_EMAIL` | Yes | Production, Preview | Destination for all form submission emails. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production, Preview | Full origin URL used in canonical tags and OG metadata. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Sprint 2 | Production | Google Analytics 4 measurement ID (`G-...`). |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Sprint 2 | Production, Preview | Mapbox public access token for interactive maps. |

---

## Vercel Project Settings

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Node.js Version | 20.x |
| Build Command | `npm run build` (default) |
| Output Directory | `.next` (default) |
| Install Command | `npm install` (default) |

No custom build command or output configuration is required.

---

## Rollback

In Vercel dashboard → **Deployments**, click any prior deployment → **Promote to Production**. Rollbacks are instant (CDN re-point, no rebuild required).

---

## Monitoring Form Delivery

After deploying, test both forms end to end:

1. Submit the **Contact** form at `/contact` — email should arrive at `CONTACT_EMAIL` within 30 seconds
2. Submit the **Enquiry** form on any property page — same destination

If email is not received:
- Check Vercel function logs: **Project → Functions → api/contact**
- Check Resend dashboard for delivery status and bounce/spam reports
- Verify `RESEND_API_KEY` and `CONTACT_EMAIL` are set in Vercel environment variables

---

## Build Output (Sprint 1 Baseline)

```
42 pages total
  Static (○):   35 pages — home, about, contact, properties, collections, neighbourhoods, legal
  SSG (●):      5 route groups — 12 properties, 4 collections, 6 neighbourhoods
  Dynamic (ƒ):  2 routes — /api/contact, /api/enquiry, /search
```

Any regression in page count or route type after a code change should be investigated before deploying.
