document.addEventListener("DOMContentLoaded", () => {
  console.log("¡Bienvenido al portafolio de Alonso!");
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    });
  });
});
