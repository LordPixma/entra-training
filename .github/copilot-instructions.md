---
# AI Coding Agent Instructions: Entra Training Platform

This project is a static web application for Microsoft Entra ID admin training, using vanilla HTML, CSS, and JavaScript, with Cloudflare Pages for deployment and Cloudflare KV for dynamic content. Use these instructions to maximize productivity as an AI coding agent.

## Architecture Overview
- **Frontend**: Single-page app (`index.html`, `script.js`, `styles.css`) with dynamic module loading and navigation. No frameworks or build tools.
- **Admin Interface**: `admin.html` for module management. Loads same JS/CSS as main app.
- **Serverless Backend**: Cloudflare Pages Functions in `functions/api/` for CRUD operations on training modules in Cloudflare KV. Static fallback modules are always available.
- **Data Model**: Training modules are JSON objects with `id`, `title`, `category`, `icon`, and `steps` (see below for schema).

## Key Workflows
- **Local Development**: No build step. Start with `python3 -m http.server 8080` (fastest) or `wrangler pages dev --local --port 3000 .` (Cloudflare emulation, slower). Never cancel Wrangler startup.
- **Manual Testing**: Always validate by navigating through at least one module (select, step through, back to training) and check admin interface loads.
- **Deployment**: Use `wrangler pages publish .` (see `wrangler.toml`). Never cancel deployment.

## Project Conventions & Patterns
- **No dependencies**: Only Wrangler CLI is required for Cloudflare Pages (`npm install -g wrangler`). No npm/yarn/pip for app code.
- **Module Structure**: Training modules are either loaded from KV (via API) or fallback to static JS objects. See `script.js` for loading logic.
- **API Endpoints**: All serverless functions are in `functions/api/`. Each file handles a single operation (e.g., `load-modules.js`, `save-module.js`).
- **Static Fallback**: If Cloudflare KV is unavailable, app loads 5 static modules (see `script.js`).
- **No authentication**: All features are public; no user login or permissions.
- **Styling**: All CSS in `styles.css` (shared by main and admin UIs).

## Data Model Example
```json
{
  "id": "unique-task-id",
  "title": "Task Title",
  "category": "Category Name",
  "icon": "🔥",
  "steps": [
    { "instruction": "Step title", "details": "Explanation", "image": "Screenshot description" }
  ]
}
```

## Key Files & Directories
- `index.html`: Main UI
- `admin.html`: Admin UI
- `script.js`: App logic (module loading, navigation)
- `styles.css`: All styling
- `functions/api/`: Cloudflare Pages Functions (KV CRUD)
- `wrangler.toml`: Cloudflare config

## Troubleshooting & Tips
- If Wrangler dev server is slow/fails, use Python HTTP server for static testing.
- Cloudflare KV is only needed for dynamic module management; static modules always work.
- No server-side validation is required for basic app functionality.

---