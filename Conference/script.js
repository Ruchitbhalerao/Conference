/* =============================================================================
   ICIPTT 2027 — site behaviour (vanilla JS)
   Converted from the React state/effects in:
     - src/components/site/SiteChrome.tsx  (Header: useState mobile menu)
     - src/routes/contact.tsx               (useState `sent` + onSubmit mailto)
     - src/routes/__root.tsx               (footer year, active route)

   Loaded as a classic script (no type="module") so the site also runs
   straight from the file:// protocol with no build step or local server.

   Everything here is progressive enhancement: the header, footer, page content
   and the contact form's native validation all work with JavaScript disabled.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
     Content mirror of src/lib/conference.ts.
     Only the values the browser actually needs at runtime live here; the rest of
     the content is baked into the static markup exactly as the SSR output was.

     `submissionUrl` is the single place to set the real submission portal: it is
     applied to every <a data-submit-link> (the header button, the footer button
     and each page call-to-action), matching the original SubmitButton, which
     read `conference.submissionUrl` and opened it in a new tab. The static
     `href="#"` in the markup is only the no-JavaScript fallback.
     ------------------------------------------------------------------------ */
  var CONFERENCE = {
    email: "secretariat@iciptt-conference.org",
    submissionUrl: "#"
  };

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  /* ---------------------------------------------------------------------------
     1. Header — mobile navigation open/close
        (useState<boolean>('open') + onClick toggle in SiteChrome.Header)
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var panel = document.querySelector("[data-mobile-nav]");
    if (!toggle || !panel) return;

    var iconOpen = toggle.querySelector("[data-icon-menu]");
    var iconClose = toggle.querySelector("[data-icon-close]");

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");

      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;

      if (open) {
        // Move focus to the first item so keyboard users land inside the menu.
        var first = panel.querySelector("a, button");
        if (first) first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(panel.hidden);
    });

    // The original closed the menu when a nav link was clicked.
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Escape closes the menu (keyboard parity with the burger button).
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Leaving the mobile breakpoint hides the panel via CSS, so reset state.
    var desktop = window.matchMedia("(min-width: 48rem)");
    var onChange = function (event) {
      if (event.matches) setOpen(false);
    };
    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", onChange);
    } else if (typeof desktop.addListener === "function") {
      desktop.addListener(onChange); // Safari < 14
    }

    setOpen(false);
  }

  /* ---------------------------------------------------------------------------
     2. Active navigation link
        (TanStack Router `activeProps` with `activeOptions={{ exact: true }}`)
        Each link carries its canonical route in `data-nav-link`, so this works
        from disk (…/about.html), from a static server (/about) and from the
        directory root (/).
     ------------------------------------------------------------------------ */
  function initActiveNav() {
    var file = window.location.pathname.split("/").pop() || "";
    var current =
      file === "" || /^index\.html?$/i.test(file)
        ? "/"
        : "/" + file.replace(/\.html?$/i, "");

    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      if (link.getAttribute("data-nav-link") === current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

/* ---------------------------------------------------------------------------
     3. Submission links
         (SiteChrome.SubmitButton: <a href={conference.submissionUrl}
          target={submissionUrl !== "#" ? "_blank" : undefined}>)
      ------------------------------------------------------------------------ */
  function initSubmitLinks() {
    var url = CONFERENCE.submissionUrl;
    if (!url || url === "#") return;

    document.querySelectorAll("[data-submit-link]").forEach(function (link) {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    });
  }

  /* ---------------------------------------------------------------------------
     4. Contact form — mailto hand-off
         (Contact.tsx: preventDefault -> FormData -> window.location.href = mailto)
         Native `required` / `type="email"` validation is left to the browser, as in
         the original.
      ------------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var note = document.querySelector("[data-form-note]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var message = data.get("message");
      var name = data.get("name");
      var email = data.get("email");
      var subject = data.get("subject");

      var body = message + "\n\n— " + name + " (" + email + ")";

      window.location.href =
        "mailto:" +
        CONFERENCE.email +
        "?subject=" +
        encodeURIComponent(String(subject)) +
        "&body=" +
        encodeURIComponent(body);

      if (note) note.hidden = false;
    });
  }

/* ---------------------------------------------------------------------------
     5. Footer copyright year — `new Date().getFullYear()` in SiteChrome.Footer
      ------------------------------------------------------------------------ */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ---------------------------------------------------------------------------
     6. Error page "Try again" — `router.invalidate(); reset()` in __root.tsx.
         Without a client router, reloading is the equivalent recovery.
      ------------------------------------------------------------------------ */
  function initReloadButtons() {
    document.querySelectorAll("[data-reload]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.location.reload();
      });
    });
  }

  /* ---------------------------------------------------------------------------
     7. Global error surface — mirrors the console.error expansion that
         src/lib/error-capture.ts installed server-side, so unexpected runtime
         failures leave a readable trail in the browser console.
      ------------------------------------------------------------------------ */
  function initErrorReporting() {
    var original = console.error.bind(console);
    console.error = function () {
      var args = Array.prototype.map.call(arguments, function (arg) {
        if (arg instanceof Error) return arg.stack || arg.name + ": " + arg.message;
        return arg;
      });
      original.apply(null, args);
    };

    window.addEventListener("error", function (event) {
      original(event.error || event.message);
    });

    window.addEventListener("unhandledrejection", function (event) {
      original(event.reason);
    });
  }

  ready(function () {
    initMobileNav();
    initActiveNav();
    initSubmitLinks();
    initContactForm();
    initYear();
    initReloadButtons();
    initErrorReporting();
  });
})();