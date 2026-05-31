# Personal Portfolio — Cristian Francesco Pennino

My personal portfolio: a fast, animated single-page site built with **Next.js**, **TypeScript** and **Tailwind CSS**, with motion powered by **Framer Motion**, **Lottie** and **Remotion**, and smooth scrolling via **Lenis**.

🔗 **Live:** 

---

## Features

- **Single-page sections** — Hero, About, Skills, Experience, Projects, Contact and Footer.
- **Scroll & reveal animations** — Framer Motion (`useInView`, reveal lines/paragraphs) for entrance and scroll-linked effects.
- **Rich motion** — Lottie animations and Remotion-powered video/motion components.
- **Smooth scrolling** — Lenis for inertial, polished scroll behaviour.
- **Custom interactions** — animated cursor and a scroll-progress indicator.
- **Responsive & accessible** — mobile-first, semantic, keyboard-friendly markup.
- **Custom typography** — multiple display and monospace faces loaded via `next/font`.

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
| Animation | Framer Motion, Lottie (`lottie-react`), Remotion |
| Scrolling | Lenis (smooth scroll) |
| Utilities | clsx, tailwind-merge |
| Deployment | Vercel |

---

## Project structure

```
app/
├─ layout.tsx        # root layout, fonts, metadata
├─ page.tsx          # page composition
└─ globals.css       # Tailwind + global styles
components/
├─ Nav.tsx           # navigation
├─ Cursor.tsx        # custom animated cursor
├─ ScrollProgress.tsx# scroll progress bar
├─ Animate.tsx       # reusable reveal animations
└─ sections/         # Hero, About, Skills, Experience, Projects, Contact, Footer
lib/
├─ projects.ts       # project data
└─ utils.ts          # helpers (cn)
```

---

## Customising

- **Projects** — edit `lib/projects.ts`.
- **Skills / experience** — edit the data in `components/sections/Skills.tsx` and `Experience.tsx`.
- **Metadata** (title, description, keywords, favicon) — `app/layout.tsx`.
- **Fonts** — configured in the root layout via `next/font`.

---

## Author

Cristian Francesco Pennino — [GitHub](https://github.com/HYP3R-08)
