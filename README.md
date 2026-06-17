# sawyerzincone.com

Ambient Mario-inspired pixel page. Plain HTML/CSS/JS — no framework, no
build step.

- `index.html`, `style.css`, `main.js` — the whole site
- `assets/sprites.png` + `assets/sprites.json` — sprite atlas; all game
  code reads only the JSON
- `assets/raw/` — source pixel art (magenta-keyed); not deployed
- `tools/build_sprites.py` — regenerates the atlas from the raw art
  (`pip install pillow`, then `python3 tools/build_sprites.py` from the
  repo root)

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push
to `master` (publishes the repo root to the `gh-pages` branch).

## license
MIT — see [LICENSE](LICENSE).
