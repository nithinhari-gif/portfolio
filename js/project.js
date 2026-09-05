/* ============================================================
   Project page — a single scrollable page per project (no tabs/
   buttons anywhere: every clip is just laid out and playable).
   Picked via the #hash (not a ?query — a query string gets dropped
   by some static servers' "clean URL" redirects, e.g. `npx serve`'s
   /project.html -> /project; a #hash never touches the server, so
   it survives that redirect)
   ============================================================ */
(function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function buildVideo(clip, fallbackPoster) {
    var v = document.createElement("video");
    v.controls = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.preload = "metadata";
    var poster = clip.poster || fallbackPoster;
    if (poster) v.poster = poster;

    var source = document.createElement("source");
    source.src = clip.src;
    source.type = "video/mp4";
    v.appendChild(source);
    return v;
  }

  var id = decodeURIComponent(location.hash.replace(/^#/, ""));
  var project = (window.PROJECTS || []).filter(function (p) { return p.id === id; })[0];

  var titleEl = document.getElementById("projectTitle");
  var categoryEl = document.getElementById("projectCategory");
  var introEl = document.getElementById("projectIntro");
  var listEl = document.getElementById("projectList");

  if (!project) {
    document.title = "Project not found — Nithin Hari";
    titleEl.textContent = "Project not found";
    categoryEl.remove();
    introEl.remove();
    return;
  }

  document.title = project.title + " — Nithin Hari";
  titleEl.textContent = project.title;

  if (project.category) {
    categoryEl.textContent = project.category;
  } else {
    categoryEl.remove();
  }

  if (project.intro) {
    introEl.textContent = project.intro;
  } else {
    introEl.remove();
  }

  var clips = (project.videos && project.videos.length) ? project.videos : [{ src: project.video }];
  var layout = project.layout === "grid" ? "grid" : "stacked";
  listEl.setAttribute("data-layout", layout);
  if (project.aspect) listEl.setAttribute("data-aspect", project.aspect);

  clips.forEach(function (clip) {
    if (layout === "grid") {
      var item = el("div", "project__clip");
      item.appendChild(buildVideo(clip, project.poster));
      if (clip.label) {
        var caption = el("p", "project__clip-label");
        caption.textContent = clip.label;
        item.appendChild(caption);
      }
      listEl.appendChild(item);
    } else {
      var section = el("section", "project__section");
      if (clip.title) {
        var h2 = el("h2", "project__clip-title");
        h2.textContent = clip.title;
        section.appendChild(h2);
      }
      if (clip.description) {
        var desc = el("p", "project__clip-desc");
        desc.textContent = clip.description;
        section.appendChild(desc);
      }
      section.appendChild(buildVideo(clip, project.poster));
      listEl.appendChild(section);
    }
  });
})();
