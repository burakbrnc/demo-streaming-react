# DEMO Streaming — Implementation Explainer

This document explains what I built, how it matches the case study PDF, how it works under the hood, and how you can run or tweak it. Per the requirement, `feed/sample.json` was not modified.

## TL;DR
- Static SPA with three routes using the URL hash:
  - `#/` (Home): two tiles (Popular Series, Popular Movies)
  - `#/series`: first 21 popular series
  - `#/movies`: first 21 popular movies
- Uses your local `feed/sample.json` for data (read-only)
- Filters: by `programType` and `releaseYear >= 2010`
- Sorts: by `title` (A → Z)
- Loading and error states implemented
- Fallback image: `assets/placeholder.png` if poster fails to load
- Header and footer match the mockups and use your `assets/social/*` and `assets/store/*` icons

## What files matter
- `index.html` — page skeleton (header, subbar, main, footer) and script include
- `styles.css` — styles for header, subbar, hero tiles (home), card grid (list pages), and footer
- `app.js` — tiny SPA logic (routing, data fetch, render)
- `assets/` — your provided icons/images (not changed)
- `feed/sample.json` — your data feed (not changed)

## How this satisfies the PDF
1. Home screen
   - Shows two large tiles: “Popular Series” and “Popular Movies” with the “Popular” label.
   - Clicking navigates to `#/series` or `#/movies`.

2. Series and Movies pages
   - Load `feed/sample.json`.
   - Filter by `programType` (series or movie) and `releaseYear >= 2010`.
   - Sort by `title` ascending.
   - Display the first 21 results as a grid of posters with titles.
   - Implements a loading state (spinner + text) while fetching.
   - Implements an error state (“Oops, something went wrong…”) if fetch fails.
   - Poster image fallback to `assets/placeholder.png` if the remote poster URL fails.

3. Header and Footer
   - Header with brand text “DEMO Streaming”, and right-aligned actions (Log in, Start your free trial).
   - A sub-header bar shows contextual titles: “Popular Titles”, “Popular Series”, or “Popular Movies”.
   - Footer includes link list, social icons (Facebook/Twitter/Instagram from `assets/social`), and store badges (App/Play/Windows from `assets/store`).

## How it works (under the hood)
- Routing
  - Hash-based routes so everything works 100% statically (no bundlers/servers needed).
  - `#/` → Home (two hero tiles)
  - `#/series` → List view for series
  - `#/movies` → List view for movies
  - Implemented in `app.js` via `window.onhashchange` and `DOMContentLoaded`.

- Data pipeline
  1. Fetch `feed/sample.json` with `cache: 'no-store'` (so edits to the file are picked up without hard-refresh hassles).
  2. Validate and normalize entries (defensive guards for missing fields).
  3. Filter by `programType` and `releaseYear >= 2010`.
  4. Sort by `title` ascending (using `localeCompare`).
  5. Slice the first 21 items.

- Rendering
  - Home: a simple two-tile grid.
  - List pages: a responsive CSS grid of cards.
  - Each card shows a poster and the title; the poster uses `loading="lazy"` and an `onerror` handler to swap to `assets/placeholder.png` if needed.

- States
  - Loading: centered spinner + “Loading…”
  - Error: centered “Oops, something went wrong…”
  - Empty: centered “No results” (in case filters remove everything)

## Edge cases handled
- Missing or broken poster URL → falls back to `assets/placeholder.png`.
- Missing title → displays “Untitled”.
- Missing/invalid releaseYear → filtered out by the `>= 2010` rule.
- Network error / blocked file access → shows error state.

## Accessibility & UX
- Images have `alt` text based on title.
- Large clickable areas for the two home tiles.
- Consistent headings via the subbar text.

## Performance notes
- Lazy-loaded posters (`loading="lazy"`).
- Only 21 items are rendered to keep the grid snappy.
- Basic CSS grid; no heavy frameworks.

## How to run locally (without changing the feed)
Because the app fetches a JSON file, open it via a local server (not `file://`). Pick one in Windows PowerShell:

```powershell
# Python 3
python -m http.server -b 127.0.0.1 5500

# Node (if you have http-server)
npx http-server -a 127.0.0.1 -p 5500
```

Then open http://127.0.0.1:5500/ in your browser.

- Home: http://127.0.0.1:5500/#/
- Series: http://127.0.0.1:5500/#/series
- Movies: http://127.0.0.1:5500/#/movies

## How to tweak
- Change the 21-item cap: in `app.js`, adjust the `.slice(0, 21)` call.
- Adjust minimum year: change the `Number(e.releaseYear) >= 2010` filter.
- Styling: edit `styles.css` (colors, spacing, fonts).

## React note (optional)
This build is intentionally framework-free per the “keep it simple and read-only feed” approach and uses no tooling. If you want the same UI in React (Vite + React), we can:
- Keep `assets/` and `feed/sample.json` as-is
- Move `index.html` to a Vite entry and port `app.js` logic into components (Home, ListPage, Card)
- Preserve filtering/sorting rules and states
- Add npm scripts to run a dev server

If you want, I can switch this to React in a follow-up without touching `sample.json`.
