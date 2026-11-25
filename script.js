const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.add("hidden");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    mobileMenu.classList.remove("hidden");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Close navigation menu");
  };

  hamburgerBtn.addEventListener("click", () => {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    isExpanded ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      hamburgerBtn.getAttribute("aria-expanded") === "true" &&
      !mobileMenu.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
}

const navbar = document.getElementById("navbar");
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        navbar.classList.add(
          "bg-white/95",
          "backdrop-blur-md",
          "shadow-sm",
          "py-[16px]",
        );
        navbar.classList.remove("bg-transparent", "py-[24px]");
      } else {
        navbar.classList.remove(
          "bg-white/95",
          "backdrop-blur-md",
          "shadow-sm",
          "py-[16px]",
        );
        navbar.classList.add("bg-transparent", "py-[24px]");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add("-translate-y-full");
      } else {
        navbar.classList.remove("-translate-y-full");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: false,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (counters.length === 0) {
    console.warn("No .counter elements found. Please check your HTML.");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute("data-target"));
          const suffix = counter.getAttribute("data-suffix") || "";
          const isDecimal = target % 1 !== 0;
          const duration = 2000; 
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = easeProgress * target;

            if (isDecimal) {
              counter.textContent = current.toFixed(1) + suffix;
            } else {
              counter.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              // Ensure final value is exact
              counter.textContent =
                (isDecimal ? target.toFixed(1) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.3 }, 
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
