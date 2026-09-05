/*
 * Nithin Hari — portfolio project list
 * --------------------------------------
 * Add / reorder projects here. The homepage rebuilds itself from this array;
 * so does project.html (see js/project.js), which renders one scrollable page
 * per project — never buttons/tabs — built from `layout` + `videos` below.
 *
 * field      | meaning
 * -----------|------------------------------------------------------------
 * id         | unique slug — also the project.html#… hash key, keep it simple
 * title      | shown in the homepage work list + the project page heading
 * category   | short subtitle shown under the project page heading (and in
 *            | the placeholder fallback if a homepage loop file is missing)
 * video      | muted homepage-loop clip (assets/videos/…) — small, cropped
 * poster     | still shown before that loop loads (assets/img/…)
 * layout     | "stacked" — clips shown one by one, full width, in one column.
 *            |   `title`/`description` per clip are optional: give clips that
 *            |   are genuinely separate pieces their own (e.g. AI Films); leave
 *            |   both off for a bare one-after-another gallery (e.g. Other Projects)
 *            | "grid"    — clips shown side by side with only a small optional
 *            |   caption each (use for a same-series set of reels, e.g. AI Reels)
 * intro      | optional paragraph shown once under the heading, above all the
 *            | clips (works with either layout)
 * videos     | array of clips actually played on the project page:
 *            |   stacked: { src, title?, description?, poster? }
 *            |   grid:    { src, label?, poster? }
 *            | Files live in assets/videos/full/<id>/ — see
 *            | assets/videos/README.md for where to upload new ones.
 * url        | where clicking the title goes. "#" = not linked yet
 *
 * The FIRST entry is the default — it plays until a homepage visitor hovers
 * another title, then the viewer reverts back to it on mouse-out.
 */
window.PROJECTS = [
  {
    id: "bu-robot",
    title: "AI Films",
    category: "ai short films & ads",
    video: "assets/videos/bu-robot.mp4",
    poster: "assets/img/bu-robot.jpg",
    layout: "stacked",
    videos: [
      {
        src: "assets/videos/full/bu-robot/bu-4k.mp4",
        poster: "assets/img/full/bu-robot/bu-4k.jpg",
        title: "BU Robot",
        description: "An AI-generated short film I directed and produced during my " +
          "Creative Technology internship at WPP Production — an exploration of how " +
          "generative AI tools can be pushed into character design, world-building, " +
          "and cinematic storytelling to build a fully imagined sci-fi universe from scratch."
      },
      {
        src: "assets/videos/full/bu-robot/festive-ad.mp4",
        poster: "assets/img/full/bu-robot/festive-ad.jpg",
        title: "AI Festive Ad — Aura Beauty Salon (Dubai)",
        description: "A festive campaign concept for Aura Beauty Salon in Dubai, visualized " +
          "entirely with AI tools during my internship at Mentar Ventures. Santa descends and " +
          "opens a box of light — a radiant beam sweeps across a woman's face, transforming it " +
          "in an instant, symbolizing the beauty, glow, and renewal that Aura brings this season."
      }
    ],
    url: "project.html#bu-robot"
  },
  {
    id: "arun-icecream",
    title: "AI Reels",
    category: "ai content",
    video: "assets/videos/arun-icecream.mp4",
    poster: "assets/img/arun-icecream.jpg",
    layout: "grid",
    aspect: "portrait",
    intro: "A set of short-form AI-generated reels made for Arun Icecream during my " +
      "Creative Technology internship at WPP Production — playful, scroll-stopping " +
      "content built for social, pairing AI-driven visuals with quick, punchy edits " +
      "designed to make you crave a scoop.",
    videos: [
      { src: "assets/videos/full/arun-icecream/family-hands-open-lid.mp4", poster: "assets/img/full/arun-icecream/family-hands-open-lid.jpg", label: "Family Hands — Open Lid" },
      { src: "assets/videos/full/arun-icecream/Arun-elavator.mp4", poster: "assets/img/full/arun-icecream/arun-elavator.jpg", label: "Arun — Elevator" },
      { src: "assets/videos/full/arun-icecream/spinning-reveal.mp4", poster: "assets/img/full/arun-icecream/spinning-reveal.jpg", label: "Spinning Reveal" },
      { src: "assets/videos/full/arun-icecream/study-break-mango.mp4", poster: "assets/img/full/arun-icecream/study-break-mango.jpg", label: "Study Break — Mango" }
    ],
    url: "project.html#arun-icecream"
  },
  {
    id: "motion-graphics-reels",
    title: "Motion Graphics Reels",
    category: "motion graphics",
    video: "assets/videos/motion-graphics-reels.mp4",
    poster: "assets/img/motion-graphics-reels.jpg",
    layout: "grid",
    aspect: "portrait",
    intro: "A mix of motion graphics work — one reel for Arun Icecream, and two for Alans Chips.",
    videos: [
      { src: "assets/videos/full/motion-graphics-reels/singapore.mp4", poster: "assets/img/full/motion-graphics-reels/singapore.jpg", label: "Singapore — Arun Icecream" },
      { src: "assets/videos/full/motion-graphics-reels/4-4-2.mp4", poster: "assets/img/full/motion-graphics-reels/4-4-2.jpg", label: "4-4-2 — Alans Chips" },
      { src: "assets/videos/full/motion-graphics-reels/Chip-slide.mp4", poster: "assets/img/full/motion-graphics-reels/chip-slide.jpg", label: "Chip Slide — Alans Chips" }
    ],
    url: "project.html#motion-graphics-reels"
  },
  {
    id: "other-projects",
    title: "Other Projects",
    category: "selected work",
    video: "assets/videos/other-projects.mp4",
    poster: "assets/img/other-projects.jpg",
    layout: "stacked",
    videos: [
      { src: "assets/videos/full/other-projects/apple-watch.mp4", poster: "assets/img/full/other-projects/apple-watch.jpg" },
      { src: "assets/videos/full/other-projects/bluelines-logo-animation.mp4", poster: "assets/img/full/other-projects/bluelines-logo-animation.jpg" },
      { src: "assets/videos/full/other-projects/city-of-spices.mp4", poster: "assets/img/full/other-projects/city-of-spices.jpg" },
      { src: "assets/videos/full/other-projects/tunnel.mp4", poster: "assets/img/full/other-projects/tunnel.jpg" }
    ],
    url: "project.html#other-projects"
  }
];
