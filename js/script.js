// Efecto de scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animación de habilidades al hacer scroll
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkills() {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width;
  });
}

// Observer para animar habilidades cuando son visibles
const skillsSection = document.querySelector("#skills");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(skillsSection);

// Toggle modo oscuro/claro
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.setAttribute(
    "data-theme",
    body.getAttribute("data-theme") === "dark" ? "light" : "dark"
  );
  themeToggle.innerHTML =
    body.getAttribute("data-theme") === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
});

// Menú móvil
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portafolio cargado 🚀");
});
