# Nithin Hari — Portfolio

Home page + a per-project page. Vanilla HTML/CSS/JS, no build step. Smooth scroll +
the expanding work-viewer on the home page use GSAP + Lenis (vendored in `libs/`,
no CDN, works offline). The project page is plain scroll — no JS animation library
needed there.

```
index.html            home page (markup)
project.html           project page — every clip for one project, laid out top to
                        bottom, always scrollable (never tabs/buttons)
css/style.css           all styling + design tokens (:root)
js/projects.js          << EDIT THIS — the list of projects
js/main.js              home page interactions (viewer expand, hover-to-switch, smooth scroll)
js/project.js            project page logic (reads the #hash, renders that project's clips)
libs/                    gsap, ScrollTrigger, lenis (home page only, pinned versions)
assets/videos/           << DROP VIDEO FILES HERE (see assets/videos/README.md)
assets/videos/masters/   your original uploads — kept permanently, never deployed/deleted
assets/videos/full/<id>/ web-ready copies WITH audio, used by project.html
assets/img/              poster stills (assets/img/full/<id>/ mirrors the videos)
```

## Run locally

Any static server works. For example:

```bash
npx serve .
```

Then open the printed URL. Opening `index.html` directly with `file://` also mostly
works but videos load more reliably over http.

Add `?nolenis` to the URL to disable the home page's smooth scrolling (useful for
debugging).

## Adding / editing projects

Everything is driven by `js/projects.js`. Each entry:

```js
{
  id: "my-project",
  title: "My Project",              // shown in the home-page list + the project page heading
  category: "motion graphics",       // small subtitle under that heading
  video: "assets/videos/my-project.mp4",   // muted homepage loop
  poster: "assets/img/my-project.jpg",      // optional still for the loop

  layout: "stacked",   // or "grid" — how the project page lays the clips out
  aspect: "portrait",  // "grid" only: "portrait" (9:16) or "landscape" (16:9) columns
  intro: "Optional paragraph shown once under the heading (grid layout).",

  videos: [
    // "stacked" — each clip is its own title + description + full-width video:
    { src: "assets/videos/full/my-project/clip.mp4", poster: "…", title: "Clip Name", description: "…" },
    // "grid" — clips side by side with only a small optional caption:
    { src: "assets/videos/full/my-project/clip.mp4", poster: "…", label: "Clip Name" }
  ],

  url: "project.html#my-project"   // clicking the title goes here
}
```

- Use **`layout: "stacked"`** when the clips are genuinely separate pieces (each
  gets its own title + description) — see `AI Films`.
- Use **`layout: "grid"`** for a same-series set of reels shown side by side, with
  one shared `intro` paragraph and a small `label` per clip — see `AI Reels` /
  `Motion Graphics Reels`. Omit `label` (and `intro`) entirely for a bare gallery
  with no text at all — see `Other Projects`.
- The **first** entry in the top-level array is the homepage default that plays
  until a visitor hovers another title, then the viewer reverts to it on mouse-out.
- Missing homepage-loop files show a branded blue placeholder instead of breaking.
- Clicking a title (or its cursor-following "view project" pill) navigates to
  `project.html#<id>`, which renders every `videos[]` entry per `layout`. It's a
  `#hash`, not a `?query` — some static servers (including `npx serve`, used
  above) 301-redirect `/project.html` → `/project` and drop query strings in
  that redirect, but a hash never touches the server so it survives.
- See `assets/videos/README.md` for exactly where to upload new clips and how the
  homepage-loop / project-page versions get generated from them.

## Branding

Primary colour `#002FA7` (International Klein Blue), set as `--klein` in
`css/style.css`. Headings in **Space Grotesk**, body copy in **Newsreader** (serif).
Paper `#ffffff`, ink `#0a0a0a`.

## Still TODO (need input from Nithin)

- Social links (placeholders `#` in `index.html`)
- `bu-robot` / `arun-icecream` **homepage loops** were built from originals that no
  longer exist (deleted before the masters/ convention existed) — not a problem
  right now, just noted in case that loop ever needs re-cutting
- Any additional projects or clips (see "Adding / editing projects" above and
  `assets/videos/README.md`)
