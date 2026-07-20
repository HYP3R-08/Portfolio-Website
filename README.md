# Personal Portfolio — Cristian Francesco Pennino

My personal portfolio: a fast, animated single-page site built with **Next.js** (App Router), **TypeScript** and **Tailwind CSS**, with motion powered by **Framer Motion** and smooth scrolling via **Lenis**.

🔗 **Live:** [penninocristianfrancesco.dev](https://penninocristianfrancesco.dev)

---

## Features

- **Single-page sections** — Hero, About, Skills, Experience, Projects, Contact and Footer.
- **Dedicated project pages** — statically generated case-study routes at `/projects` and `/projects/[id]`.
- **Scroll & reveal animations** — Framer Motion (`useInView`, masked line/word reveals) for entrance and scroll-linked effects.
- **Smooth scrolling** — Lenis for inertial, polished scroll behaviour.
- **Custom interactions** — animated cursor and a scroll-progress indicator.
- **Accessible motion** — every animation respects `prefers-reduced-motion` (via `MotionConfig` and a CSS fallback), plus a skip-to-content link and semantic, keyboard-friendly markup.
- **SEO** — per-page metadata, a dynamic sitemap and robots, and `Person` JSON-LD.
- **Custom typography** — Cormorant, Plus Jakarta Sans, Syne and JetBrains Mono loaded via `next/font`.

---

## Featured projects

Project data lives in `lib/projects.ts`:

| Project | Focus | Year |
|---------|-------|------|
| **TechStore** | Full-stack e-commerce — React, Supabase, Stripe | 2025 |
| **Velvet Pour** | Animated landing page — GSAP, motion design | 2025 |
| **AuthLog** | IoT access control — STM32, ESP8266, Supabase, React Native | 2025 |
| **Smart Packaging** | Embedded / IoT firmware — STM32 | 2024 |
| **ForestGuard** | Environmental monitoring — STM32, LoRa | 2025 |
| **RoboCup Rescue Bot** | Autonomous robot — computer vision, AI, simulation | 2026 |

---

## Tech stack

| Area | Technologies |
|------|--------------|
| Framework | Next.js (App Router), React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Scrolling | Lenis (smooth scroll) |
| Utilities | clsx, tailwind-merge |
| Deployment | Vercel |

---

## Project structure

```
app/
├─ layout.tsx        # root layout, fonts, metadata, JSON-LD
├─ page.tsx          # home page composition
├─ globals.css       # Tailwind + global styles
├─ sitemap.ts        # dynamic sitemap
├─ robots.ts         # robots rules
└─ projects/
   ├─ page.tsx       # projects index
   └─ [id]/page.tsx  # per-project case study (statically generated)
components/
├─ SiteChrome.tsx    # shared chrome: cursor, nav, footer, Lenis, MotionConfig
├─ Cursor.tsx        # custom animated cursor
├─ ScrollProgress.tsx# scroll progress bar
├─ Nav.tsx           # navigation
├─ Animate.tsx       # reusable reveal animations
├─ ProjectsGallery.tsx / ProjectDetail.tsx
├─ project-layouts/  # Cinematic, Split, Gallery case-study layouts
└─ sections/         # Hero, About, Skills, Experience, Projects, Contact, Footer
lib/
├─ projects.ts       # project data
└─ utils.ts          # helpers (cn)
```

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Customising

- **Projects** — edit `lib/projects.ts`.
- **Skills / experience** — edit the data in `components/sections/Skills.tsx` and `Experience.tsx`.
- **Metadata** (title, description, keywords, favicon) — `app/layout.tsx`.
- **Fonts** — configured in the root layout via `next/font`.

---

## Author

Cristian Francesco Pennino — [GitHub](https://github.com/HYP3R-08) · [penninocristianfrancesco.dev](https://penninocristianfrancesco.dev)
