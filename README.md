# Shootin' Shots Photography

Static website for **Shootin' Shots Photography** by Cassidy Sophier — a local photographer and videographer in Parker County, Texas.

## Project structure

```
shootin-shots/
├── index.html          # Home page
├── about.html          # About and contact
├── gallery.html        # Photo gallery
├── 404.html            # GitHub Pages custom 404
├── favicon.ico         # Site icon (add to repo root)
├── css/
│   ├── base.css        # Theme variables, layout shell, footer, CTAs
│   ├── menu.css        # Hamburger navigation
│   ├── font-size.css   # Responsive typography
│   └── pages/          # Page-specific styles
│       ├── home.css
│       ├── about.css
│       ├── gallery.css
│       └── error.css
├── js/
│   ├── navigation.js   # Shared nav + footer (all pages)
│   ├── gallery.js      # Gallery fade-in sequence
│   └── scroll-animate.js  # Home scroll reveal
└── images/             # Photos and logo (see below)
```

## Images

Place image assets in the `images/` folder (or full-resolution masters in `images-source/` — see below).

| File | Purpose |
|------|---------|
| `shootin-shots-logo.png` | Header logo on every page |
| `profile.jpeg` | About page headshot |
| `bubble1.jpeg` … `bubble4.jpeg` | Home page service samples |
| `image1.jpeg` … `image21.jpeg` | Gallery photos |

### Optimizing for the web (Lighthouse / performance)

Gallery photos were often 6000px wide but display at ~500px in a two-column layout. The repo includes a build step that:

1. Generates **WebP** variants at display-appropriate widths (with `srcset` / `sizes`).
2. Replaces oversized **JPEG/PNG fallbacks** with resized, compressed files.
3. Updates HTML to use `<picture>` so modern browsers load WebP and others use JPEG/PNG.

**Before your first optimization run**, copy originals into `images-source/` if you want to keep full-resolution masters (the script overwrites files in `images/`).

```bash
npm install
npm run optimize-images
```

Re-run `npm run optimize-images` whenever you add or replace photos. Width presets live in `scripts/optimize-images.mjs` (`gallery`, `home`, `profile`, `logo`).

## Run locally

Use a local static server (do not open HTML files directly with `file://` — scripts and paths may not work correctly):

```bash
npx serve .
```

Or use the **Live Server** extension in VS Code.

## Deploy to GitHub Pages

1. Create a repository named `shootin-shots` on GitHub.
2. Push this project to the default branch.
3. In the repo **Settings → Pages**, set source to deploy from the branch root (`/`).
4. Ensure `404.html` is at the repo root (GitHub Pages uses it automatically).

### Project site URL (`username.github.io/shootin-shots/`)

If the site is served from a subpath, relative asset links usually work on normal pages. For broken deep links, the 404 page may fail to load CSS when the browser resolves paths from the wrong URL. If that happens, add this to the `<head>` of every HTML file (uncomment and adjust only for project-site hosting):

```html
<!-- <base href="/shootin-shots/"> -->
```

For a **custom domain** at the site root, leave the base tag commented out.

## Development notes

- Navigation and footer markup live in `js/navigation.js` and are injected into `[data-nav]` and `[data-footer]` placeholders.
- Gallery images are sorted by `data-order` in `gallery.js` before the staggered reveal animation runs.
- Home topic sections use `IntersectionObserver` in `scroll-animate.js` for scroll-in effects.
