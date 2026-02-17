// =========================
// Scroll Reveal (IntersectionObserver)
// =========================
const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // se anima 1 vez
      }
    });
  },
  {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealElements.forEach((el) => observer.observe(el));
