// Efecto de scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Cerrar menú móvil si está abierto
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
      
      // Scroll suave al elemento objetivo
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualizar URL sin recargar la página
      history.pushState(null, null, targetId);
    }
  });
});

// Toggle modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferencia del sistema y tema guardado
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Prioridad: localStorage > preferencia del sistema > light por defecto
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  } else if (prefersDark) {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
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
  
  // Guardar preferencia
  localStorage.setItem('theme', newTheme);
});

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.innerHTML = isOpen 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Efecto de olas dinámico
function initWaveAnimation() {
  const waves = {
    top: document.querySelector('.wave-top'),
    middle: document.querySelector('.wave-middle'),
    bottom: document.querySelector('.wave-bottom')
  };
  
  // Parámetros de animación
  const waveParams = {
    speed: 0.5, // Velocidad base
    amplitude: 50, // Rango de movimiento horizontal
    heightVariation: 0.2, // Variación de altura
    layers: {
      top: { speedMultiplier: 1.2, scale: 1.0 },
      middle: { speedMultiplier: 0.8, scale: 1.1 },
      bottom: { speedMultiplier: 0.6, scale: 0.9 }
    }
  };
  
  let time = 0;
  
  function animateWaves() {
    time += 0.005;
    
    // Animar cada capa de olas con parámetros diferentes
    Object.keys(waves).forEach(layer => {
      const wave = waves[layer];
      if (wave) {
        const params = waveParams.layers[layer];
        const speed = waveParams.speed * params.speedMultiplier;
        const offset = Math.sin(time * speed) * waveParams.amplitude;
        const scaleY = 1 + (Math.sin(time * speed * 1.5) * waveParams.heightVariation * params.scale);
        
        wave.style.transform = `translateX(${offset}px) scaleY(${scaleY})`;
      }
    });
    
    requestAnimationFrame(animateWaves);
  }
  
  animateWaves();
}

// Animaciones al hacer scroll
function animateOnScroll() {
  const animatableElements = document.querySelectorAll(
    '.project-card, .contact-card, .social-card, .section h2, .section p, .skills-chips'
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
    '.project-card, .contact-card, .social-card, .section h2, .section p, .skills-chips'
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
  initWaveAnimation();
  
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
  if (!localStorage.getItem('theme')) {
    body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    themeToggle.innerHTML = e.matches 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
});