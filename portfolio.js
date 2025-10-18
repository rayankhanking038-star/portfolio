/* ----------------------------
         Helper selectors
         ---------------------------- */
function qs(sel, ctx) {
  return (ctx || document).querySelector(sel);
}
function qsa(sel, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
}

/* ----------------------------
         Typing animation (types once)
         - types "Hello, I'm Muhammad Rayan"
         - types character-by-character then stops
         ---------------------------- */
(function typingOnce() {
  var target = qs("#typeTarget");
  if (!target) return;

  var text = "Hello, I'm Muhammad Rayan";
  var idx = 0;
  var speed = 67; // ms per character (adjust if you want faster/slower)

  target.textContent = ""; // start empty

  var typer = setInterval(function () {
    target.textContent += text.charAt(idx);
    idx++;
    if (idx >= text.length) {
      clearInterval(typer);
      // optionally add a subtle cursor blink removal or final styling
    }
  }, speed);
})();

/* ----------------------------
         Scroll reveal for each <section>
         - sections start hidden (CSS) and get class 'revealed' when in view
         ---------------------------- */
(function revealOnScroll() {
  var sections = qsa("main section[id]");
  if (!sections.length) return;

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach(function (s) {
    io.observe(s);
  });
})();

/* ----------------------------
         Nav link active highlight (based on section in view)
         ---------------------------- */
(function activeNavOnScroll() {
  var sections = qsa("main section[id]");
  var links = qsa(".navlinks a");

  if (!sections.length || !links.length) return;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (s) {
    io.observe(s);
  });
})();

/* ----------------------------
         Skill meters animation
         ---------------------------- */
(function skillMeters() {
  var meters = qsa(".meter");
  if (!meters.length) return;

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var m = entry.target;
          var span = qs("span", m);
          var pct = m.getAttribute("data-percent") || "80";
          span.style.width = pct + "%";
          obs.unobserve(m);
        }
      });
    },
    { threshold: 0.35 }
  );

  meters.forEach(function (m) {
    io.observe(m);
  });
})();

/* ----------------------------
         Lightbox for portfolio items & thumbnail gallery
         - Uses single #lightbox element
         - Items must have data-src or contain <img>
         ---------------------------- */
(function lightboxSetup() {
  var lightbox = qs("#lightbox");
  var lightboxImg = qs("#lightboxImg");

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  // Portfolio items
  qsa(".port-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var src =
        item.getAttribute("data-src") ||
        (qs("img", item) && qs("img", item).src);
      if (src) openLightbox(src);
    });
  });

  // Thumbnails
  qsa(".thumb-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var src =
        item.getAttribute("data-src") ||
        (qs("img", item) && qs("img", item).src);
      if (src) openLightbox(src);
    });
  });

  // Close on overlay click
  lightbox.addEventListener("click", function (e) {
    // close if clicking outside the image
    if (e.target === lightbox || e.target === lightboxImg) {
      closeLightbox();
    }
  });

  // Close on Escape
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();

/* ----------------------------
         Demo reel button (opens Google Drive folder)
         ---------------------------- */
(function demoReel() {
  var demoBtn = qs("#playDemo");
  var driveLink =
    "https://drive.google.com/drive/folders/1ITEOPtcNFw0t-H8Gj1xjpqNvFcKxak52?dmr=1&ec=wgc-drive-hero-goto";
  if (!demoBtn) return;
  demoBtn.addEventListener("click", function () {
    window.open(driveLink, "_blank", "noopener");
  });
})();

/* ----------------------------
         Contact form demo validation
         ---------------------------- */
(function contactDemo() {
  var send = qs("#send");
  if (!send) return;
  send.addEventListener("click", function () {
    var name = qs("#name").value.trim();
    var email = qs("#email").value.trim();
    var msg = qs("#message").value.trim();
    if (!name || !email || !msg) {
      alert("Please fill all fields before sending.");
      return;
    }
    alert("Thanks, " + name + "\n! This is a Demo Message");
    qs("#name").value = "";
    qs("#email").value = "";
    qs("#message").value = "";
  });
})();

/* ----------------------------
         Accessibility: ensure external links open safely
         ---------------------------- */
(function safeExternalLinks() {
  qsa('a[target="_blank"]').forEach(function (a) {
    if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener noreferrer");
  });
})();

/* End of script */
