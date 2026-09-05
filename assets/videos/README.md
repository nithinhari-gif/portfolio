# Videos

Each project's page is a plain **scrollable** list of its clips — never tabs or
buttons. Three tiers per project, all driven by one entry in `js/projects.js`:

```
assets/videos/masters/<id>/          ← your ORIGINAL files, one folder per project,
                                        as many files as you want (never deployed,
                                        never deleted)
assets/videos/<id>.mp4                ← generated: muted, cropped, homepage-loop clip
assets/videos/full/<id>/<clip>.mp4    ← generated: web-ready copy of a file in
                                         masters/<id>/, WITH audio — these are what
                                         actually plays on the project page
assets/img/full/<id>/<clip>.jpg        ← poster still for that clip (optional but recommended)
```

`js/projects.js` ties it together — see the field comments at the top of that file
for `layout` ("stacked" vs "grid"), `aspect`, `intro`, and the `videos[]` shape.

## Current projects

| project | id | layout | clips in `full/<id>/` |
|---|---|---|---|
| AI Films | `bu-robot` | stacked, own title+description each | `bu-4k.mp4` (BU Robot), `festive-ad.mp4` (AI Festive Ad — Aura Beauty Salon) |
| AI Reels | `arun-icecream` | grid, portrait, shared intro | `family-hands-open-lid.mp4`, `sequence-01.mp4`, `spinning-reveal.mp4`, `study-break-mango.mp4` |
| Motion Graphics Reels | `motion-graphics-reels` | grid, portrait, shared intro | `singapore.mp4` (Arun Icecream), `4-4-2.mp4`, `final-sequence.mp4` (both Alans Chips) |
| Other Projects | `other-projects` | grid, landscape, no text at all | `apple-watch.mp4`, `bluelines-logo-animation.mp4`, `city-of-spices.mp4`, `tunnel.mp4` |

All were transcoded to h264 + AAC (where the source had audio), capped at 1920px on
the long edge, faststart. Untouched originals live in `assets/videos/masters/<id>/`
(the outer folder renamed to the id; filenames inside otherwise unchanged, except
`full/bu-robot/festive-ad.mp4` which was renamed — you renamed the transcoded
output yourself to "Festive ad.mp4"; the master is still `masters/bu-robot/new edit 5.mov`).

Two projects intentionally leave clips OUT of the gallery — they're only used for
the homepage loop and aren't meant to be part of the project page's clip list:

- `masters/motion-graphics-reels.mov` ("motion alans") → only feeds
  `assets/videos/motion-graphics-reels.mp4` (the homepage loop)
- `masters/other-projects.mov` ("Timeline 1") → only feeds
  `assets/videos/other-projects.mp4` (the homepage loop)

## ⚠️ bu-robot / arun-icecream homepage loops predate this convention

Their homepage-loop clips (`assets/videos/bu-robot.mp4`, `arun-icecream.mp4`) were
made from originals that were deleted before `masters/` existed, so there's no
master to regenerate those two loops from if they ever need re-cutting. Doesn't
affect the project-page galleries above — those are the files you just uploaded.

## Adding a new clip to an existing project

1. Drop the file into `assets/videos/masters/<id>/`.
2. Ask me to render it, or run this yourself:

   ```bash
   # landscape source (scales down, never up, caps at 1920 wide)
   ffmpeg -i "masters/<id>/clip.mov" -vf "scale='min(1920,iw)':-2" \
     -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p \
     -c:a aac -b:a 160k -movflags +faststart "full/<id>/clip.mp4"

   # portrait source (caps at 1920 tall instead)
   ffmpeg -i "masters/<id>/clip.mov" -vf "scale=-2:'min(1920,ih)'" \
     -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p \
     -c:a aac -b:a 160k -movflags +faststart "full/<id>/clip.mp4"

   # poster still (grab ~1s in)
   ffmpeg -ss 1 -i "full/<id>/clip.mp4" -frames:v 1 -vf "scale=900:-2" \
     -q:v 4 "../img/full/<id>/clip.jpg"
   ```

3. Add it to that project's `videos` array in `js/projects.js` — `{ title, description }`
   for a "stacked" project, `{ label }` (or nothing) for a "grid" one.

## Adding a whole new project

Same as above, plus: pick/encode one clip as the homepage loop (muted,
`assets/videos/<id>.mp4`, `scale=1440:-2`, `-an`), grab its poster into
`../img/<id>.jpg`, and add the project object to `js/projects.js`
(`url: "project.html#<id>"`, pick `layout`/`aspect` per the guidance in that file).
