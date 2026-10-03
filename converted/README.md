# ICIPTT 2027 — vanilla conversion

This folder is a **standalone, build-step-free** conversion of the Lovable
`tanstack_start_ts` project (`../pixel-perfect-render-74061-main`).

| React / TypeScript original | Vanilla equivalent |
| --- | --- |
| `@tanstack/react-router` file routes (4 routes) | 4 static HTML pages + real `<a href>` links |
| `src/routes/__root.tsx` shell (`Header` / `Outlet` / `Footer`) | repeated `<header>` / `<main>` / `<footer>` markup |
| `src/routes/__root.tsx` `notFoundComponent` | `404.html` |
| `src/routes/__root.tsx` `errorComponent` | `error.html` |
| `src/routes/index.tsx` | `index.html` |
| `src/routes/about.tsx` | `about.html` |
| `src/routes/call-for-papers.tsx` | `call-for-papers.html` |
| `src/routes/contact.tsx` (`useState` + `onSubmit`) | `contact.html` + `script.js` `initContactForm()` |
| `src/components/site/SiteChrome.tsx` (`useState` menu, `SubmitButton`, `Logo`, `SocialLinks`, `PageHero`, `Footer`) | static markup + `.btn*`, `.site-header`, `.site-footer`, `.hero-band` styles + `script.js` `initMobileNav()` |
| `src/components/site/NetworkPattern.tsx` | inlined `<svg class="network-pattern">` (and `assets/images/network-pattern.svg`) |
| `src/lib/conference.ts` | baked into the static markup (the original was SSR, so the HTML already contained it) |
| `src/styles.css` (Tailwind v4 + `@utility`) | `style.css` — hand-written CSS, same tokens |
| `lucide-react` icons | inlined SVGs (exact v0.575.0 path data); originals in `assets/icons/` |
| `src/lib/error-capture.ts` console expansion | `script.js` `initErrorReporting()` |
| `src/lib/lovable-error-reporting.ts` | dropped — it only talks to the Lovable editor preview (`window.__lovableEvents`) |
| `src/server.ts` / `src/start.ts` | not applicable — see "Backend" below |
| `src/components/ui/*` (45 shadcn files) | dropped — no route ever imported them |

## Running it

**Just open `index.html`.** There is no build step, no npm install and no server
required. `script.js` is a classic (non-module) script, so the whole site also
works over the `file://` protocol.

If you prefer clean URLs and HTTP (e.g. to preview on a phone on your LAN):

```sh
cd converted
python3 -m http.server 8000     # then visit http://localhost:8000
```

## Structure

```
converted/
├── index.html              Home
├── about.html              About
├── call-for-papers.html    Call for Papers
├── contact.html            Contact (+ mailto form)
├── 404.html                notFoundComponent
├── error.html              errorComponent
├── style.css               all styling (no Tailwind, no preprocessor)
├── script.js               all behaviour (mobile menu, form, active nav, year)
├── robots.txt              from public/robots.txt
└── assets/
    ├── images/
    │   ├── favicon.ico         from public/favicon.ico
    │   └── network-pattern.svg  standalone copy of the hero artwork
    ├── icons/               the 11 lucide icons (inlined in the HTML too)
    └── fonts/               see fonts/README.txt
```

## Editing the content

The original kept every editable value in one file (`src/lib/conference.ts`).
That file is now the HTML itself — update the markup directly:

- Conference name / theme / dates / venue → `index.html` hero + every `<title>`
- Dates, topics, submission types, guidelines, audiences, committee →
  the matching section in `index.html`, `about.html`, `call-for-papers.html`
- Email / phone / address / social URLs → `contact.html` and the footer of every
  page; the contact form's recipient also comes from `CONFERENCE.email` in
  `script.js`
- **Submission platform URL → `CONFERENCE.submissionUrl` at the top of
  `script.js`.** That one value is applied to every submit button on every page
  (`<a data-submit-link>` — the header button, the footer button and each page
  call-to-action), opening it in a new tab exactly like the original
  `SubmitButton`. The `href="#"` in the markup is only the no-JavaScript
  fallback, so those only need editing if you want them to work without JS.

The bracketed values (`[Institution]`, `Prof. [Name]`, guideline placeholders)
are deliberate placeholders carried over unchanged from the original.

## Backend / API

**The original project has no backend.** Verified across the whole source tree:

- no `fetch` / `axios` calls, no `@supabase/supabase-js`, no auth, no database
- no `.env` files and no `import.meta.env` usage
- `@tanstack/react-query` is mounted in `__root.tsx` but never queried — nothing
  to port
- `src/server.ts` and `src/start.ts` are TanStack Start **SSR plumbing** (an error
  wrapper and a CSRF middleware for server functions). There are no server
  functions and no loaders, so there is nothing to deploy. That plumbing exists
  only because the original rendered on a server; the static HTML here replaces it.
- The contact form uses `mailto:` (exactly as `src/routes/contact.tsx` did), so
  no mail service is involved.

If you later add a real submission endpoint, replace the `href="#"` targets and
the `mailto:` hand-off in `script.js`. **Do not put private API keys in
`script.js`** — it ships to the browser; proxy through a server instead.

## Accessibility

- Semantic landmarks (`header` / `nav` / `main` / `footer`), one `<h1>` per page
- `aria-current="page"` on the active nav item (baked into the HTML, so it is
  correct even with JS disabled)
- Mobile menu is a real `<button>` with `aria-expanded` / `aria-controls`, the
  Menu/Close icons swap via `hidden`, and <kbd>Esc</kbd> closes it
- "Skip to main content" link
- Every decorative icon has `aria-hidden="true"`; every icon-only link has an
  `aria-label`; the network pattern is hidden from assistive tech
- Form labels are bound to their inputs with `for`/`id`; native `required` and
  `type="email"` validation is preserved exactly as in the React version
- Visible `:focus-visible` outlines (the original relied on the UA default)
- `prefers-reduced-motion` is respected

## Known deviations from the original

1. **The header and footer are duplicated in each HTML page.** The React app
   rendered them once via `<Outlet />`. Plain HTML cannot do that without
   JavaScript, and rendering them with JS would leave the site unusable with JS
   disabled — static repetition is the standard static-site trade-off.
2. **`aria-current` is also set by JS.** The value is hardcoded per page for the
   no-JS case; `initActiveNav()` recomputes it from the URL.
3. **Links are relative (`about.html`), not route paths (`/about`).** This is
   what makes the `file://` requirement work. The canonical route for each link
   is preserved in `data-nav-link` for JS and styling.
4. **`robots.txt` references no sitemap** — same as the original.
5. **The error page's "Try again" reloads the document.** The original called
   `router.invalidate(); reset()`; without a client router, `location.reload()`
   is the equivalent recovery, so `error.html` loads `script.js` for it.
6. **Unused utility classes from the original stylesheet were dropped.** The React
   app went through Tailwind, so `src/styles.css` had no hand-written component
   rules. `style.css` contains only the rules the markup actually uses, so there
   is no dead CSS to maintain.