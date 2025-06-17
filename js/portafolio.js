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
      updateMenuIconColor();
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
  updateMenuIconColor();
}

// Función para actualizar el color del ícono del menú
function updateMenuIconColor() {
  if (navLinks.classList.contains('active')) {
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    menuToggle.style.color = isDarkMode ? 'white' : 'black';
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
  
  updateMenuIconColor();
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
      updateMenuIconColor();
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
  
  // Cambiar color del icono basado en el tema actual
  if (isOpen) {
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    menuToggle.style.color = isDarkMode ? 'white' : 'black';
  } else {
    menuToggle.style.color = '';
  }
});

// Observador para cambios de tema
const themeObserver = new MutationObserver(() => {
  if (navLinks.classList.contains('active')) {
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    menuToggle.style.color = isDarkMode ? 'white' : 'black';
  }
});

themeObserver.observe(body, {
  attributes: true,
  attributeFilter: ['data-theme']
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

// Filtrado de proyectos
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Agregar clase active al botón clickeado
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  initTheme();
  setupAnimations();
  setupProjectFilters();
  
  // Verificar cada 5 minutos si hay que resetear el tema
  setInterval(checkThemeReset, 300000); // 300000 ms = 5 minutos
  
  // Animación inicial
  setTimeout(() => {
    animateOnScroll();
  }, 300);
  
  // Configurar observador de scroll para animaciones
  window.addEventListener('scroll', animateOnScroll);
  
  console.log('Portafolio cargado 🚀');
});

// Manejar cambios en la preferencia de color del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  // Solo si no hay tema guardado manualmente
  if (!localStorage.getItem('theme')) {
    body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    themeToggle.innerHTML = e.matches 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
    updateMenuIconColor();
  }
});