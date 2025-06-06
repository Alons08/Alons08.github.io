// Efecto de scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    if (targetElement) {
      // Cerrar menú móvil si está abierto
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.style.color = '';
      }

      // Ajustar desplazamiento para evitar que el título quede oculto
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight,
        behavior: 'smooth'
      });

      // Actualizar URL sin recargar la página
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// Toggle modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferencia del tema guardado y tiempo transcurrido
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeTimestamp = localStorage.getItem('themeTimestamp');
  
  // Si hay un tema guardado pero ha pasado más de 2 horas (7200000 ms)
  if (savedTheme && themeTimestamp) {
    const now = new Date().getTime();
    if (now - parseInt(themeTimestamp) > 7200000) {
      // Han pasado más de 2 horas, resetear a modo día
      localStorage.removeItem('theme');
      localStorage.removeItem('themeTimestamp');
      body.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      return;
    }
  }
  
  // Prioridad: localStorage > modo día por defecto
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  } else {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Cambiar tema
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Aplicar nuevo tema
  body.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
  
  // Guardar preferencia y timestamp solo si es modo noche
  if (newTheme === 'dark') {
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('themeTimestamp', new Date().getTime());
  } else {
    localStorage.removeItem('theme');
    localStorage.removeItem('themeTimestamp');
  }
});

// Verificar periódicamente si hay que resetear el tema
function checkThemeReset() {
  const savedTheme = localStorage.getItem('theme');
  const themeTimestamp = localStorage.getItem('themeTimestamp');
  
  if (savedTheme === 'dark' && themeTimestamp) {
    const now = new Date().getTime();
    if (now - parseInt(themeTimestamp) > 7200000) { // 2 horas = 7200000 ms
      // Resetear a modo día
      body.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.removeItem('theme');
      localStorage.removeItem('themeTimestamp');
    }
  }
}

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

// Asegurar altura consistente del navbar
navbar.style.height = '80px';
navbar.style.boxSizing = 'border-box';

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.innerHTML = isOpen 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
  
  // Cambiar color del icono cuando el menú está abierto
  if (isOpen) {
    menuToggle.style.color = 'white';
  } else {
    menuToggle.style.color = '';
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.color = '';
  });
});

// Animaciones al hacer scroll
function animateOnScroll() {
  const animatableElements = document.querySelectorAll(
    '.project-card, .contact-card, .social-card, .section h2, .section p, .skills-icons, .skill-icon'
  );
  
  animatableElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Configurar animaciones iniciales
function setupAnimations() {
  document.querySelectorAll(
    '.project-card, .contact-card, .social-card, .section h2, .section p, .skills-icons, .skill-icon'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
  });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  initTheme();
  setupAnimations();
  
  // Verificar cada minuto si hay que resetear el tema
  setInterval(checkThemeReset, 60000); // 60000 ms = 1 minuto
  
  // Animación inicial
  setTimeout(() => {
    animateOnScroll();
  }, 300);
  
  // Configurar observador de scroll para animaciones
  window.addEventListener('scroll', animateOnScroll);
  
  console.log('Portafolio cargado 🚀');
});

// Manejar cambios en la preferencia de color del sistema (opcional)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  // Solo si no hay tema guardado manualmente
  if (!localStorage.getItem('theme')) {
    body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    themeToggle.innerHTML = e.matches 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
});