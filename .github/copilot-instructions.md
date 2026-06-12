# GitHub Copilot Instructions

## Project Overview
Personal site for sawyerzincone.com: an ambient Mario-inspired pixel
page. Plain HTML/CSS/JS with no framework, no build step, and no
localStorage. A canvas layer renders an ambient scene (pixel character,
two cats, clouds, ground) behind DOM letter blocks that link to About,
email, and LinkedIn.

## Structure
- `index.html` / `style.css` / `main.js` — the entire site
- `assets/sprites.png` + `assets/sprites.json` — sprite atlas; all
  rendering code reads frame rects only from the JSON
- `assets/raw/` — source pixel art on magenta backgrounds (not deployed)
- `tools/build_sprites.py` — regenerates the atlas (Pillow required)

## Conventions
- Keep everything dependency-free and buildless; total page weight under
  500 KB
- Pixel art must stay crisp: nearest-neighbor scaling only,
  `image-rendering: pixelated`, integer display scales
- Animations are delta-time based on requestAnimationFrame
- Respect `prefers-reduced-motion`: static scene, all links functional
- Interactive elements are real `<a>`/`<button>` elements, keyboard
  focusable, 44px+ tap targets
- `<noscript>` fallback must always provide name + About text + email +
  LinkedIn links

## Deployment
GitHub Pages. Push to `master` triggers
`.github/workflows/deploy.yml`, which publishes the repo root to the
`gh-pages` branch (peaceiris/actions-gh-pages). The custom domain is
configured by the root `CNAME` file (www.sawyerzincone.com) — do not
remove it.
