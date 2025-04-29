// Efecto de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Cerrar menú móvil si está abierto
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Toggle modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferencia del sistema
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Establecer tema inicial
if (localStorage.getItem('theme')) {
  body.setAttribute('data-theme', localStorage.getItem('theme'));
  themeToggle.innerHTML = localStorage.getItem('theme') === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
} else if (prefersDarkScheme.matches) {
  body.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.setAttribute('data-theme', 'light');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
  
  // Guardar preferencia en localStorage
  localStorage.setItem('theme', newTheme);
});

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Animación al hacer scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project-card, .contact-item, .social-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Establecer opacidad inicial para elementos animados
document.querySelectorAll('.project-card, .contact-item, .social-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
});

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portafolio cargado 🚀');
  
  // Animación inicial
  setTimeout(() => {
    animateOnScroll();
  }, 300);
});

// Animación al hacer scroll
window.addEventListener('scroll', animateOnScroll);

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validar campos
    if (!name || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Simular envío (puedes reemplazar esto con una integración real)
    console.log('Formulario enviado:', { name, email, message });
    alert('Gracias por contactarme. Me pondré en contacto contigo pronto.');

    // Limpiar formulario
    contactForm.reset();
  });
}