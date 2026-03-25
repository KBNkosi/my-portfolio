// SECTION: Utility
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

// SECTION: Navigation toggle
const nav = select(".site-nav");
const navToggle = select(".nav-toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on link click (mobile)
  selectAll(".nav-list a", nav).forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// SECTION: Smooth scroll enhancement
// Native CSS smooth scrolling is enabled; this prevents focus loss for keyboard users.
selectAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = select(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

// SECTION: Active nav link on scroll
const sections = selectAll("main section[id]");
const navLinks = selectAll(".nav-list a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      if (!id) return;

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${id}`) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => observer.observe(section));

// SECTION: Scroll reveal for sections
const revealEls = selectAll(".reveal");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.24,
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}


// SECTION: Footer year
const yearEl = select("#year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
