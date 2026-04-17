const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeText = themeToggle?.querySelector(".theme-toggle-text");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const header = document.querySelector(".site-header");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#07111f" : "#f4f7fb");
  }

  if (themeText) {
    themeText.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function toggleMenu(forceState) {
  const shouldOpen = typeof forceState === "boolean" ? forceState : !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", shouldOpen);
  navToggle?.setAttribute("aria-expanded", String(shouldOpen));
}

navToggle?.addEventListener("click", () => toggleMenu());

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

document.addEventListener("click", (event) => {
  if (!siteNav.classList.contains("is-open")) {
    return;
  }

  const clickedInsideMenu = siteNav.contains(event.target);
  const clickedToggle = navToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    toggleMenu(false);
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(false);
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const composedBody = [
    "Hi Dilip,",
    "",
    message,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ].join("\n");

  formStatus.textContent = "Opening your email app with the message ready to send.";
  window.location.href = `mailto:yadavdilipkumar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composedBody)}`;
});

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
