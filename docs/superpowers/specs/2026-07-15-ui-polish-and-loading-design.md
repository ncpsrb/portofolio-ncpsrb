# UI Polish & Loading Readiness — Design

## Context

The portfolio (Next.js 15 App Router, Tailwind 4, Framer Motion) has no route-level
loading UI anywhere, uses raw `<img>` tags for the header avatar and project
thumbnails (no fixed dimensions, no fade-in), and has a few small loose ends:
an uncommitted header.tsx edit and a new, unlinked `/image-generator` utility
route. This spec covers a polish + "make the page feel ready" pass.

## Goals

1. Eliminate visible image pop-in / layout shift on the homepage and project
   cards.
2. Give client-side route navigation (`/projects`, `/experience`, `/blog`)
   immediate visual feedback instead of a blank gap.
3. Finish the in-flight header cleanup and surface the new image-generator
   tool from the footer.
4. General polish pass: focus-visible states, hover-transition consistency,
   mobile spacing.

## Non-goals

- No full-page splash/loading screen (rejected — adds a deliberate wait,
  makes the site feel slower).
- No data-fetching Suspense boundaries — `page.tsx` and all experience/blog
  posts are static (local data / MDX compiled at build time), so there's no
  async data-loading state to cover.
- No changes to `image-generator`'s internal functionality — only its
  discoverability (footer link).

## Design

### 1. Image loading

- Convert the header avatar (`app/header.tsx`, both the back-button and
  normal-link variants) from `<img>` to `next/image`, with explicit
  width/height (60×60, matching current `h-15 w-15`) and `priority` (it's
  the above-the-fold LCP element).
- Convert project thumbnails (`components/ui/projectcardModal.tsx`, both the
  card preview and the expanded modal view) from `<img>` to `next/image`
  with explicit dimensions matched to their `aspect-video` containers.
  These stay lazy-loaded (default `next/image` behavior) since most are
  off-screen initially.
- Add a lightweight fade-in on load: track loaded state per image (`onLoad`
  handler), opacity 0 → 1 over ~200ms, sitting on top of the existing
  neutral skeleton background (`bg-zinc-100` / `dark:bg-white/[0.035]`)
  already present on the card container. No new dependency — plain
  React state + CSS transition.
- Verify `next.config.mjs` needs no changes for local `/public` images
  (expected to work out of the box); adjust only if `next build` surfaces
  an issue.

### 2. Route-level loading skeletons

- Add `app/loading.tsx` — a generic skeleton shell (matches the page's
  overall spacing/rhythm) shown as the default fallback for any route
  segment without its own loading file.
- Add targeted `loading.tsx` files for `app/projects/`, `app/experience/`,
  and `app/blog/` matching each route's actual layout (card grid stub for
  projects, list-row stub for experience, list stub for blog) so the
  placeholder doesn't visually jump when real content replaces it.
- These are static markup only (skeleton divs with pulse animation via
  Tailwind's `animate-pulse`) — no client JS.

### 3. Dead code cleanup

- Remove `ProjectVideo` (and its now-unused imports, if any become
  unused) from `app/page.tsx` — defined but never rendered anywhere.

### 4. Header / footer wiring

- Commit the already-made header.tsx change (removal of the `xnstore.my.id`
  `BriefcaseBusiness` icon from the social-link row) — no further change
  needed there, just finishing what's already staged in the working tree.
- Add a small link to `/image-generator` in `app/footer.tsx`, styled
  consistent with existing footer text (`text-xs text-zinc-400`,
  hover-underline), placed right-aligned in the existing
  `flex items-center justify-between` row (opposite the `ThemeSwitch`,
  which currently has that side empty).

### 5. General polish pass

Audit and fix directly, no separate approval per item:

- `focus-visible` states on interactive elements that are missing them
  (buttons, links) for keyboard-navigation accessibility and visual
  consistency with the site's existing `focus-visible:outline-2` pattern
  (already used in the footer theme switch).
- Hover-transition consistency across buttons/links (duration/easing
  already mostly consistent — fix any outliers found).
- Mobile spacing/overflow: header name/profession truncation on narrow
  viewports, project-card horizontal scroll behavior on mobile.

## Testing

Manual verification only (no visual regression tooling in this repo):

- `next build` succeeds with no new type/lint errors.
- Dev server visual check: home, `/projects`, `/experience`, `/blog` on
  desktop and a mobile viewport — confirm no layout shift on image load,
  confirm loading skeletons appear briefly on client-side navigation,
  confirm footer link works, confirm header renders correctly with the
  icon removed.
