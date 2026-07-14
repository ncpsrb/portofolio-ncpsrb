# UI Polish & Loading Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio feel visually "ready" on load (no image pop-in, instant feedback on route navigation) and clean up loose ends (in-flight header edit, unlinked image-generator tool, dead code, missing focus states).

**Architecture:** Pure presentation-layer changes to an existing Next.js 15 App Router site. Convert raw `<img>` usage to `next/image` in the two spots that matter for perceived load (header avatar, project thumbnails), add static `loading.tsx` skeleton files as Suspense fallbacks for route segments, remove one dead component, and apply one consistent focus-visible convention already established elsewhere in the codebase to interactive elements that are missing it.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, TypeScript. No new dependencies.

## Global Constraints

- No new npm dependencies — everything here uses `next/image` and Tailwind, already installed.
- Reuse the existing focus-visible convention found in `components/ui/work-experience-card.tsx:119`: `focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500`. Apply this exact class string (append to existing `className`) to every interactive element touched in this plan that lacks a focus-visible state.
- No automated test suite exists in this repo (verified: no test script in `package.json`, no test files). `next lint` is also currently broken on `main` itself (pre-existing: `eslint.config.mjs` extends `plugin:prettier/recommended`, which needs `eslint-plugin-prettier` + `eslint-config-prettier` — neither is installed, and installing them surfaces a further ESLint 9 flat-config incompatibility). Fixing that is out of scope for this plan. Verification is `npx tsc --noEmit` (fast, per task) and `npm run build` (full type-check + production build, final task) plus a manual dev-server visual check, matching the design spec's Testing section.
- All image assets referenced in this plan live under `/public` already (confirmed present: `public/personal.jpg`, `public/portofolio/**/*.png`). No `next.config.mjs` changes are expected.
- Do not modify `image-generator`'s internal behavior — only its discoverability (Task 6).

---

### Task 1: Header avatar — `next/image` + focus-visible + finish in-flight cleanup

**Files:**
- Modify: `app/header.tsx`

**Interfaces:**
- Consumes: none (leaf UI change, independent of other tasks).
- Produces: none (no other task imports from this file).

Note: `app/header.tsx` currently has an uncommitted change in the working tree (removal of the `xnstore.my.id` `BriefcaseBusiness` social icon and the now-unused `PROFILE_LINKS` import). This task builds on top of that existing state and commits it together with the changes below — do not revert it.

- [ ] **Step 1: Add the `next/image` import**

In `app/header.tsx`, change:

```tsx
'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { ABOUT_ME } from './data'
import { Magnetic } from '@/components/ui/magnetic'
import { Github, Twitter, Linkedin, ArrowLeft } from 'lucide-react'
```

to:

```tsx
'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'
import { ABOUT_ME } from './data'
import { Magnetic } from '@/components/ui/magnetic'
import { Github, Twitter, Linkedin, ArrowLeft } from 'lucide-react'
```

- [ ] **Step 2: Convert the back-button avatar to `next/image` and add focus-visible**

Find:

```tsx
          <button
            onClick={() => router.back()}
            className="group relative h-15 w-15 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700"
          >
            <img
              src={ABOUT_ME[0].image}
              alt="Profile"
              className="h-15 w-15 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowLeft className="h-5 w-5 text-white" />
            </div>
          </button>
```

Replace with:

```tsx
          <button
            onClick={() => router.back()}
            className="group relative h-15 w-15 overflow-hidden rounded-full border border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:focus-visible:ring-zinc-500"
          >
            <Image
              src={ABOUT_ME[0].image}
              alt="Profile"
              width={60}
              height={60}
              priority
              className="h-15 w-15 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ArrowLeft className="h-5 w-5 text-white" />
            </div>
          </button>
```

- [ ] **Step 3: Convert the home-link avatar to `next/image` and add focus-visible**

Find:

```tsx
          <Link
            href="/"
            className="group relative h-15 w-15 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700"
          >
            <img
              src={ABOUT_ME[0].image}
              alt="Profile"
              className="h-15 w-15 object-cover"
            />
            {!isHome && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowLeft className="h-5 w-5 text-white" />
              </div>
            )}
          </Link>
```

Replace with:

```tsx
          <Link
            href="/"
            className="group relative h-15 w-15 overflow-hidden rounded-full border border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:focus-visible:ring-zinc-500"
          >
            <Image
              src={ABOUT_ME[0].image}
              alt="Profile"
              width={60}
              height={60}
              priority
              className="h-15 w-15 object-cover"
            />
            {!isHome && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowLeft className="h-5 w-5 text-white" />
              </div>
            )}
          </Link>
```

- [ ] **Step 4: Add focus-visible to the social icon links**

In the `MagneticSocialLink` component, find:

```tsx
      <a
        href={link}
        target="_blank"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
```

Replace with:

```tsx
      <a
        href={link}
        target="_blank"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-zinc-500"
      >
```

- [ ] **Step 5: Fix name/profession overflow on narrow viewports**

The name/profession block has no `min-w-0`/`truncate`, so in the header's flex row it can overflow instead of shrinking on narrow screens (flex items default to `min-width: auto`, blocking shrink). Find:

```tsx
        <div>
          <Link href="/" className="font-medium text-black dark:text-white">
            {ABOUT_ME[0].name}
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            {ABOUT_ME[0].profession}
          </TextEffect>
        </div>
```

Replace with:

```tsx
        <div className="min-w-0">
          <Link
            href="/"
            className="block truncate font-medium text-black dark:text-white"
          >
            {ABOUT_ME[0].name}
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="truncate text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            {ABOUT_ME[0].profession}
          </TextEffect>
        </div>
```

Then find the outer wrapper so it can actually shrink within the header's flex row:

```tsx
      <div className="flex items-center gap-2">
```

Replace with:

```tsx
      <div className="flex min-w-0 items-center gap-2">
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (`next lint` is broken repo-wide on a pre-existing, unrelated issue — see Global Constraints — so this task uses `tsc` for verification instead).

- [ ] **Step 7: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: profile avatar in the header renders immediately (no flash of missing image), circular crop and border look identical to before. Tab to the avatar and social icons with keyboard — each shows a visible focus ring. Navigate to `/projects` and confirm the header now shows a back arrow on hover with the same focus ring behavior. Resize the browser to ~320px wide — name and profession text truncate with an ellipsis instead of overflowing or pushing the social icons off-screen.

- [ ] **Step 8: Commit**

```bash
git add app/header.tsx
git commit -m "polish: next/image avatar, focus-visible states, finish header cleanup"
```

---

### Task 2: Project thumbnails — `next/image` + fade-in on load

**Files:**
- Modify: `components/ui/projectcardModal.tsx`

**Interfaces:**
- Consumes: none (leaf UI change, independent of other tasks).
- Produces: none.

- [ ] **Step 1: Add imports and per-image loaded state**

Find:

```tsx
'use client'

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { ExternalLink, XIcon } from 'lucide-react'

type Project = {
  name: string
  description: string
  video: string
  link: string
}

const isVideo = (url: string) => {
  try {
    const extension = new URL(url).pathname.split('.').pop()
    return /(mp4|webm|mov)$/i.test(extension ?? '')
  } catch {
    return false
  }
}

export default function ProjectCardModal({ project }: { project: Project }) {
  return (
```

Replace with:

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { ExternalLink, XIcon } from 'lucide-react'

type Project = {
  name: string
  description: string
  video: string
  link: string
}

const isVideo = (url: string) => {
  try {
    const extension = new URL(url).pathname.split('.').pop()
    return /(mp4|webm|mov)$/i.test(extension ?? '')
  } catch {
    return false
  }
}

export default function ProjectCardModal({ project }: { project: Project }) {
  const [thumbLoaded, setThumbLoaded] = useState(false)
  const [modalLoaded, setModalLoaded] = useState(false)

  return (
```

- [ ] **Step 2: Convert the card thumbnail to `next/image` with fade-in**

Find:

```tsx
          {/* Video Preview */}
          <div className="transition-transform duration-500 ease-in-out group-hover:scale-105">
            {isVideo(project.video) ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                className="aspect-video w-full object-cover"
              />
            ) : (
              <img
                loading="lazy"
                src={project.video}
                alt={project.name}
                className="aspect-video w-full object-cover"
              />
            )}
          </div>
```

Replace with:

```tsx
          {/* Video Preview */}
          <div className="relative aspect-video w-full overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105">
            {isVideo(project.video) ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                className="aspect-video w-full object-cover"
              />
            ) : (
              <Image
                src={project.video}
                alt={project.name}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                onLoad={() => setThumbLoaded(true)}
                className={`object-cover transition-opacity duration-200 ${
                  thumbLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
```

- [ ] **Step 3: Convert the expanded modal image to `next/image` with fade-in**

Find:

```tsx
            <div className="bg-zinc-100 p-3 dark:bg-black/20">
              {isVideo(project.video) ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  className="max-h-[68vh] w-full rounded-lg bg-white object-contain dark:bg-zinc-950"
                />
              ) : (
                <img
                  loading="eager"
                  src={project.video}
                  alt={project.name}
                  className="max-h-[68vh] w-full rounded-lg bg-white object-contain dark:bg-zinc-950"
                />
              )}
            </div>
```

Replace with:

```tsx
            <div className="bg-zinc-100 p-3 dark:bg-black/20">
              {isVideo(project.video) ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  className="max-h-[68vh] w-full rounded-lg bg-white object-contain dark:bg-zinc-950"
                />
              ) : (
                <div className="relative h-[68vh] w-full">
                  <Image
                    src={project.video}
                    alt={project.name}
                    fill
                    sizes="90vw"
                    onLoad={() => setModalLoaded(true)}
                    className={`rounded-lg bg-white object-contain transition-opacity duration-200 dark:bg-zinc-950 ${
                      modalLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              )}
            </div>
```

Note: this changes the expanded image container from `max-h-[68vh]` (height driven by the image's natural aspect ratio, capped at 68vh) to a fixed `h-[68vh]` (always 68vh tall, image letterboxed inside via `object-contain`). This is a deliberate trade-off: `next/image` with `fill` requires a sized parent, and a fixed height is the simplest way to get that without measuring every project image's aspect ratio. Visually, small-aspect-ratio images will now sit in a slightly taller box than before instead of shrinking to fit — acceptable since the box is still centered and letterboxed correctly.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (see Global Constraints — `next lint` is broken repo-wide on a pre-existing, unrelated issue, so `tsc` is used for verification instead).

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: each of the 9 project thumbnails fades in smoothly (no hard pop) as it loads, sits on the existing neutral card background while loading, and hover-scale still works. Click a card to open the modal — the expanded image fades in the same way and is fully visible/centered within its box, not stretched or cropped oddly. Confirm no console errors about missing `next/image` width/height.

- [ ] **Step 6: Commit**

```bash
git add components/ui/projectcardModal.tsx
git commit -m "polish: next/image project thumbnails with fade-in on load"
```

---

### Task 3: Root loading skeleton

**Files:**
- Create: `app/loading.tsx`

**Interfaces:**
- Consumes: none.
- Produces: none (Next.js picks this up automatically as the Suspense fallback for any route segment without its own `loading.tsx`).

- [ ] **Step 1: Create the skeleton**

Create `app/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <main
      className="animate-pulse space-y-10"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="space-y-4">
        <div className="h-6 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-9 w-40 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </section>

      <section className="space-y-3">
        <div className="h-5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </section>

      <section className="space-y-3">
        <div className="h-5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (see Global Constraints — `next lint` is broken repo-wide on a pre-existing, unrelated issue, so `tsc` is used for verification instead).

- [ ] **Step 3: Manual visual check**

This fallback only shows if the `/` route segment's render takes long enough to suspend, which is rare in dev. Confirm it at least renders correctly in isolation: temporarily add `await new Promise((r) => setTimeout(r, 2000))` at the top of `app/page.tsx`'s default export (inside the function body, before `return`), run `npm run dev`, hard-refresh `http://localhost:3000`, confirm the skeleton appears for ~2s then the real page replaces it with no layout jump. Remove the temporary `setTimeout` line afterward — do not commit it.

- [ ] **Step 4: Commit**

```bash
git add app/loading.tsx
git commit -m "feat: add root loading skeleton"
```

---

### Task 4: Route loading skeletons (projects, experience, blog)

**Files:**
- Create: `components/ui/list-loading-skeleton.tsx`
- Create: `app/projects/loading.tsx`
- Create: `app/blog/loading.tsx`
- Create: `app/experience/loading.tsx`

**Interfaces:**
- Consumes: none.
- Produces: `ListLoadingSkeleton` — a default-exported React component from `components/ui/list-loading-skeleton.tsx`, taking no props, rendering the row-list skeleton markup shared by the projects and blog routes (they use identical list layouts — see `app/projects/page.tsx` and `app/blog/page.tsx`).

- [ ] **Step 1: Create the shared list skeleton component**

Create `components/ui/list-loading-skeleton.tsx`:

```tsx
export default function ListLoadingSkeleton() {
  return (
    <main
      className="animate-pulse space-y-0"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mb-5 h-7 w-40 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-col space-y-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl px-4 py-4">
            <div className="space-y-2">
              <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create the projects route loading file**

Create `app/projects/loading.tsx`:

```tsx
import ListLoadingSkeleton from '@/components/ui/list-loading-skeleton'

export default function Loading() {
  return <ListLoadingSkeleton />
}
```

- [ ] **Step 3: Create the blog route loading file**

Create `app/blog/loading.tsx`:

```tsx
import ListLoadingSkeleton from '@/components/ui/list-loading-skeleton'

export default function Loading() {
  return <ListLoadingSkeleton />
}
```

- [ ] **Step 4: Create the experience list skeleton**

The experience route has a different layout (header block + card grid, not a row list — see `app/experience/page.tsx`), so it gets its own inline skeleton rather than the shared component. Create `app/experience/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <main
      className="mx-auto max-w-4xl animate-pulse space-y-8 px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-3">
        <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-64 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full max-w-xl rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-zinc-200/70 bg-zinc-100 dark:border-white/5 dark:bg-white/[0.025]"
          />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (see Global Constraints — `next lint` is broken repo-wide on a pre-existing, unrelated issue, so `tsc` is used for verification instead).

- [ ] **Step 6: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`. Click "Show All Projects →", then use the browser back button, then click "Show All →" for Work Experience, then back, then navigate to the blog link if visible. Because these routes are statically prerendered, the skeleton may flash too briefly to see reliably on localhost — confirm at minimum that each route still renders its real content correctly afterward (no console errors, no broken layout) and that the skeleton markup visually resembles the real page layout by comparing side-by-side (open each `loading.tsx`/`list-loading-skeleton.tsx` skeleton mentally against its corresponding `page.tsx` layout — row heights and grid shape should roughly match).

- [ ] **Step 7: Commit**

```bash
git add components/ui/list-loading-skeleton.tsx app/projects/loading.tsx app/blog/loading.tsx app/experience/loading.tsx
git commit -m "feat: add route-level loading skeletons for projects, blog, experience"
```

---

### Task 5: Homepage — remove dead code, add focus-visible and hover polish

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: none (leaf UI change, independent of other tasks).
- Produces: none.

- [ ] **Step 1: Remove the unused `ProjectVideo` component**

In `app/page.tsx`, find and delete this entire block (the component is defined but never rendered anywhere in the file):

```tsx
type ProjectVideoProps = { src: string }

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.8 }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0, y: -2 },
            animate: {
              opacity: 1,
              y: 0,
              transition: { ease: EASE, duration: 0.25, delay: 0.2 },
            },
            exit: {
              opacity: 0,
              y: -2,
              transition: { ease: EASE, duration: 0.15 },
            },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
```

Leave everything else in the file untouched — `MorphingDialog`, `MorphingDialogTrigger`, `MorphingDialogContainer`, `MorphingDialogContent`, `MorphingDialogClose`, and `XIcon` are all still used by the Download Resume dialog later in the file, so no import changes are needed.

- [ ] **Step 2: Add focus-visible to the Contact Me and Download Resume trigger buttons**

Both buttons currently share this exact `className`. Find (both occurrences — one on the "Contact Me" `<button>`, one on the "Download Resume" `<button>` inside `MorphingDialogTrigger`):

```tsx
className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600"
```

Replace both occurrences with:

```tsx
className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500"
```

- [ ] **Step 3: Add focus-visible to the CV password submit button**

Find:

```tsx
                          <button
                            type="submit"
                            className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                          >
                            Download CV
                          </button>
```

Replace with:

```tsx
                          <button
                            type="submit"
                            className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500"
                          >
                            Download CV
                          </button>
```

- [ ] **Step 4: Add focus-visible to the PROFILE_LINKS pills**

Find:

```tsx
                <Link
                  key={profileLink.label}
                  href={profileLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/15 dark:hover:bg-white/[0.045] dark:hover:text-zinc-100"
                >
```

Replace with:

```tsx
                <Link
                  key={profileLink.label}
                  href={profileLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/15 dark:hover:bg-white/[0.045] dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-500"
                >
```

- [ ] **Step 5: Add hover and focus-visible to the "Show All" links**

This exact `className` appears three times total in the file, but only **two are live**: Work Experience and Projects. The Blog/Notes section's entire `<motion.section>` — including its own "Show All →" link — is wrapped in a `{/* ... */}` comment block, so its copy of this string is not live code. Do not touch text inside that comment block; only replace the string in the two live, uncommented occurrences. Find each live occurrence of:

```tsx
className="text-sm font-medium"
```

Replace each with:

```tsx
className="rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-200 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-500"
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (see Global Constraints — `next lint` is broken repo-wide on a pre-existing, unrelated issue, so `tsc` is used for verification instead).

- [ ] **Step 7: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm: page still renders identically aside from the intended changes (no visual regression from the `ProjectVideo` removal, since it was never rendered). Tab through the page with keyboard — Contact Me, Download Resume, the profile pills (Upwork/Fiverr), and each "Show All →" link show a visible focus ring and the "Show All" links now visibly change color on hover.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx
git commit -m "polish: remove dead ProjectVideo component, add focus-visible and hover states"
```

---

### Task 6: Footer — link to image-generator tool

**Files:**
- Modify: `app/footer.tsx`

**Interfaces:**
- Consumes: none.
- Produces: none.

- [ ] **Step 1: Import `Link` and add the footer link**

Find:

```tsx
'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
```

Replace with:

```tsx
'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
```

Then find:

```tsx
export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
```

Replace with:

```tsx
export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
        <Link
          href="/image-generator"
          className="rounded-sm text-xs text-zinc-400 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:text-zinc-300 dark:focus-visible:ring-zinc-500"
        >
          Image Tool
        </Link>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (see Global Constraints — `next lint` is broken repo-wide on a pre-existing, unrelated issue, so `tsc` is used for verification instead).

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the footer. Confirm "Image Tool" appears right-aligned opposite the theme switch, is keyboard-focusable with a visible ring, and clicking it navigates to `/image-generator` which renders the banner generator tool correctly.

- [ ] **Step 4: Commit**

```bash
git add app/footer.tsx
git commit -m "feat: link image-generator tool from footer"
```

---

### Task 7: Full verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: build completes with no type errors and all 19 routes still generate (baseline: `/`, `/_not-found`, `/api/download-cv`, `/api/img`, `/blog`, `/blog/post/exploring-the-intersection-of-design-ai-and-design-engineering`, `/delete-data`, `/experience`, `/experience/post/bank-mandiri`, `/experience/post/evermos`, `/experience/post/gunadarma`, `/experience/post/nstore-tech`, `/experience/post/smbc-indonesia`, `/image-generator`, `/privacy-policy`, `/projects`, `/robots.txt`, plus the loading fallbacks are not separate routes). This is the first point all six prior tasks' changes are type-checked together. Note: the build output will still print an ESLint plugin-load error during its lint step (pre-existing, unrelated — see Global Constraints); this does not fail the build and is expected.

- [ ] **Step 2: End-to-end manual walkthrough**

Run: `npm run start` (serves the production build), open `http://localhost:3000`.

Walk through and confirm:
- Home page: avatar loads instantly with no pop, all 9 project thumbnails fade in smoothly, no layout shift as images load (watch the page load on a throttled network via browser dev tools "Slow 3G" if available).
- Keyboard-tab through the whole home page: every interactive element (avatar, social icons, Contact Me, Download Resume, profile pills, Show All links) shows a visible focus ring in the correct order.
- `/projects`, `/experience`, `/blog`: each loads correctly, "Show All" navigation works both directions (forward and browser back).
- Footer "Image Tool" link navigates to `/image-generator` and the tool still works (enter a game name and image URL, confirm the preview renders).
- Toggle dark/light theme via the footer switch — confirm all new focus rings and the footer link are legible in both themes.
- Resize the browser to a mobile width (~375px) — confirm the header doesn't overflow/truncate awkwardly and project cards remain scrollable.

- [ ] **Step 3: Confirm git state**

Run: `git log --oneline -8` and `git status`
Expected: six feature commits from Tasks 1–6 on top of the existing history, working tree clean (no leftover uncommitted changes, no leftover `setTimeout` debug line from Task 3).
