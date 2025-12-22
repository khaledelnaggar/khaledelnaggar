document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    history.pushState(null, "", href);

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Navigation background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;

  nav.style.background =
    window.scrollY > 100 ? "rgba(15, 15, 35, 0.98)" : "rgba(15, 15, 35, 0.95)";
});


(() => {
  const subtitle = document.querySelector(".hero .subtitle");
  if (!subtitle) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const text = subtitle.textContent || "";
  subtitle.textContent = "";

  setTimeout(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
      }
    };
    typeWriter();
  }, 600);
})();
