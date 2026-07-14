# Aditya Soma — Portfolio

Monochrome, grainy, anti-mainstream portfolio. Live at
[aditya-soma-portfolio.vercel.app](https://aditya-soma-portfolio.vercel.app).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **GSAP** (+ ScrollTrigger) for all motion
- **Lenis** smooth scroll — desktop only, disabled on mobile/tablet and
  inside scrollable popups (`data-lenis-prevent`)
- **PP Neue Montreal** via font CDN

## Features

- First-load preloader (staggered name, 0→100 counter, cursor-reactive glow)
- Seamless curtain page transitions — content swaps & scroll resets while
  the curtain is fully closed, logo on the curtain
- Custom blend-mode cursor with contextual labels
- Fully custom form controls: dropdowns and a date picker (whole field is
  clickable, glass calendar popup) — no native `<select>`/`<input type=date>`
- Glassmorphism + animated film grain + black/white gradients everywhere
- Interactive extras: magnetic buttons, cursor-repelling skill chips,
  floating work previews that chase the cursor, scrub-brightening manifesto,
  sticky stacked service cards
- Pages: Home, Works (+ per-project pages), Contact, Privacy Policy,
  Legal Terms, custom 404

## Development

```bash
npm install
npm run dev
```

## Deploy

Pushed to `main` → auto-deploys on Vercel (project name
`aditya-soma-portfolio`).

## Adding a new work

Add one entry to `src/lib/data.ts` — the works grid, home list, and the
project detail page are all generated from it.
