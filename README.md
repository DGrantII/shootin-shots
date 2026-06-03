# Shootin' Shots Photography

React SPA for **Shootin' Shots Photography** by Cassidy Sophier — a local photographer and videographer in Parker County, Texas.

Built with Vite, React, TypeScript, and Bootstrap. Deployed to GitHub Pages at `username.github.io/shootin-shots/`.

## Project structure

```
shootin-shots/
├── public/
│   ├── images/              # Optimized WebP srcsets + JPEG/PNG fallbacks
│   └── .nojekyll
├── src/
│   ├── components/          # Layout, nav, ResponsivePicture, lightbox, etc.
│   ├── pages/               # Home, About, Gallery, Not Found
│   ├── hooks/               # Scroll reveal, gallery stagger
│   ├── data/                # Services content, gallery manifest
│   └── styles/              # Bootstrap theme + page SCSS
├── scripts/
│   └── optimize-images.mjs  # Sharp image pipeline
└── index.html               # Vite entry
```

## Images (optimized payload ~5–6 MB)

The Sharp optimization pipeline generates display-sized WebP variants with compressed fallbacks. **Always run this after adding or replacing photos** — never commit unoptimized multi-MB originals to `public/images/`.

| File | Purpose |
|------|---------|
| `shootin-shots-logo.png` | Header logo |
| `profile.jpeg` | About page headshot |
| `bubble1.jpeg` … `bubble4.jpeg` | Home service samples |
| `image1.jpeg` … `image21.jpeg` | Gallery photos |

### Workflow

```bash
# 1. Place new/changed full-resolution masters in images-source/ (gitignored)
# 2. Generate optimized variants + manifest.json
npm run optimize-images
# 3. Commit public/images/ and manifest.json
# 4. Build and deploy
npm run build
```

The script:

1. Generates **WebP** variants at display-appropriate widths (with `srcset` / `sizes`).
2. Replaces oversized **JPEG/PNG fallbacks** with resized, compressed files.
3. Writes **`public/images/manifest.json`** — the single source of truth for all `<picture>` rendering in React.

Width presets live in `scripts/optimize-images.mjs` (`gallery`, `home`, `profile`, `logo`).

## Development

```bash
npm install
npm run dev        # http://localhost:5173/shootin-shots/
npm run build      # output to dist/
npm run preview    # preview production build locally
```

## Deploy to GitHub Pages

The GitHub Actions workflow (`.github/workflows/static.yml`) runs `npm ci`, `npm run build`, copies `index.html` to `404.html` for SPA routing, and uploads `dist/`.

1. Push to the `main` branch.
2. In repo **Settings → Pages**, ensure source is **GitHub Actions**.

### Project site URL

The Vite `base` and React Router `basename` are set to `/shootin-shots/` for project-site hosting at `username.github.io/shootin-shots/`.

## Features

- Bootstrap Offcanvas navigation
- Home service sections with scroll-in animations
- Gallery with staggered fade-in reveal and fullscreen lightbox (prev/next, keyboard nav)
- Responsive `<picture>` elements with WebP srcsets on every image
- Montserrat + Dancing Script typography matching the logo
