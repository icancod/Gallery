# Cinematic Gallery Replica

Premium fullscreen cinematic gallery inspired by REF.digital's About page. This Next.js demo recreates a center-origin, scroll-scrubbed mosaic reveal using GSAP + ScrollTrigger and Lenis smooth scrolling. Images are loaded from Cloudinary and the layout is optimized for a dark, editorial aesthetic.

## Features
- Fullscreen pinned gallery section
- Center-origin wave-based mosaic reveal (scroll-scrubbed)
- GSAP timelines with ScrollTrigger
- Lenis smooth scrolling
- Cloudinary-hosted images (f_auto,q_auto)
- Tailored CSS for cinematic, editorial layout

## Requirements
- Node.js 16+ or compatible
- npm

## Local Setup
1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Open http://localhost:3000 and scroll to the gallery section.

## Build

```bash
npm run build
npm run start
```

## Deployment (Vercel)
1. Create a Vercel account if you don't have one and install the Vercel CLI (optional):

```bash
npm i -g vercel
```

2. In the Vercel dashboard, import the repository `icancod/Adobe_Gallery` and set the framework to `Next.js`.
3. Ensure the following build command and output settings are default: `npm run build` and output directory handled by Next.
4. Deploy — Vercel will handle environment setup automatically.

Alternatively, use `vercel` CLI inside the project root and follow prompts.

## Notes
- Images are pulled from Cloudinary. Replace the `images` array in `components/GalleryReveal.tsx` with your own Cloudinary URLs for production.
- If you need to include large media files in the repo, use Git LFS. This repo was pushed without large media to keep history small.
- For best fidelity to the REF.digital reference, test in Chrome / Safari on desktop with a smooth-scroll capable environment.

## Tuning
- Adjust scroll pacing and wave sizes inside `components/GalleryReveal.tsx`. Key places:
  - `ScrollTrigger` `end` (controls total scroll length)
  - wave grouping and `stagger` values (controls reveal rhythm)
  - Lenis `lerp` (controls smoothness)

## License
MIT

# Cinematic Gallery Replica

## Install

```bash
npm install
npm run dev
```

## Required Packages

```bash
npm install gsap @studio-freight/lenis
```

## Replace Images

Open:

`components/GalleryReveal.tsx`

Replace the Cloudinary URLs with your own images.

## Features

- REF.digital inspired center expansion animation
- The Circle Company inspired dark cinematic theme
- GSAP ScrollTrigger
- Lenis smooth scrolling
- Sticky scroll storytelling
- Fullscreen gallery reveal
