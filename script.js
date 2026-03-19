const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const revealTargets = document.querySelectorAll("[data-reveal]");
const parallaxTargets = document.querySelectorAll("[data-parallax]");
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.transform = `translate(${ringX - 23}px, ${ringY - 23}px)`;
  requestAnimationFrame(animateCursor);
};

animateCursor();

document.addEventListener("mouseleave", () => {
  cursorDot.style.opacity = "0";
  cursorRing.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursorDot.style.opacity = "1";
  cursorRing.style.opacity = "1";
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        intersectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealTargets.forEach((el) => intersectionObserver.observe(el));

let latestScroll = 0;
let ticking = false;

const updateParallax = () => {
  parallaxTargets.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const translateY = latestScroll * speed;
    el.style.transform = `translate3d(0, ${translateY}px, 0)`;
  });
  ticking = false;
};

window.addEventListener("scroll", () => {
  latestScroll = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});
