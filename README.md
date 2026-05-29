# Hatomagi — Terminal Portfolio

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue?style=flat-square)](LICENSE) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/haxvzje/hatomagi) [![Issues](https://img.shields.io/github/issues/haxvzje/hatomagi?style=flat-square)](https://github.com/haxvzje/hatomagi/issues)

A lightweight, static portfolio that emulates a developer terminal (CLI) experience while also offering an optional GUI landing page with subtle visual effects (snowfall, oneko sprite). Designed to be dependency-free, easy to customize, and simple to host.

Live demo
- GUI: `gui/index.html`
- Optional demo site: https://sx-9.github.io/term-port/ (if available)

Highlights
- Terminal-style portfolio with simulated commands (see `js/cmds/`)
- Optional GUI landing page with snowfall and oneko sprite (`gui/index.html`)
- Minimal — plain HTML/CSS/JS, no heavy frameworks
- Easy to extend: add commands by adding modules to `js/cmds/`

Quick start
1. Clone the repository:

```bash
git clone https://github.com/haxvzje/hatomagi.git
```

2. Open locally:
- Open `gui/index.html` directly in your browser, or
- Serve the project and visit the GUI:

```bash
python -m http.server 8000
# then visit http://localhost:8000/gui/
```

Note: the root `index.html` may redirect to the GUI by default; check `index.html` for `?mode=cli` flags and routing behavior.

Customization
- GUI content: `gui/index.html`, `gui/assets/css/`, `gui/assets/js/`
- Terminal commands: `js/cmds/` (each command is a standalone module)
- Global styles: `style.css`

Project structure (short)
- `index.html` — root entry (may redirect to GUI)
- `gui/` — GUI landing page with assets
- `js/` & `js/cmds/` — CLI logic and command modules

Deployment

Netlify (recommended for GUI-based sites)

1. Push your repository to GitHub (if not already pushed).
2. In Netlify UI: "New site from Git" → Connect your GitHub account → Select `haxvzje/hatomagi` →
	- Branch: `main` (or your main branch)
	- Build command: leave blank (no build needed) or set accordingly if you add a build step
	- Publish directory: `gui`
3. Click "Deploy site"; Netlify will provide a URL for your site.

Netlify CLI (alternative)

```bash
npm i -g netlify-cli
netlify login
netlify init   # follow prompts and set 'publish directory' to 'gui'
netlify deploy --prod --dir=gui
```

Notes
- If you later add a static-site build step (e.g., bundling assets), set the appropriate build command and keep `gui` or another directory as the publish directory.

GitHub Pages (alternative)

- Option A (quick): publish the `gui` folder to `gh-pages` branch:

```bash
git subtree push --prefix gui origin gh-pages
```

- Option B (npm-based): use `gh-pages` to publish `gui`:

```bash
npm install --save-dev gh-pages
# add to package.json scripts: "deploy": "gh-pages -d gui"
npm run deploy
```

Contributing
- Fork the repo, create a feature branch, and submit a Pull Request.
- Open an Issue to discuss larger changes before implementing.

License & Attribution
- This project is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0).
- When reusing this project or its assets, please provide clear credit to the author and keep the `LICENSE` file.

Suggested attribution (example):

> "Built with Hatomagi (TermPort) — original by haxvzje — Forked from satr14washere/term-port — https://github.com/haxvzje/hatomagi — Licensed under CC BY 4.0"

Fork notice
- This repository (Hatomagi CLI) is a fork of `satr14washere/term-port` (https://github.com/satr14washere/term-port). The terminal-style layout and initial structure are based on that project. Please retain upstream credit where appropriate.

Author
- haxvzje — https://github.com/haxvzje

Acknowledgements
- Typed.js (typewriter/encoding effects)
- Font Awesome (icons)
- Original inspiration: `satr14washere/term-port`