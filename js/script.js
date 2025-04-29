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

// Cerrar menú al hacer clic en un enlace (para móviles)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Animaciones al hacer scroll
function animateOnScroll() {
  const animatableElements = document.querySelectorAll(
    '.project-card, .contact-item, .social-card, .section h2, .section p, .skills-chips'
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
    '.project-card, .contact-item, .social-card, .section h2, .section p, .skills-chips'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
  });
  
  // Forzar repintado para activar transiciones
  setTimeout(() => {
    document.querySelector('body').style.visibility = 'visible';
  }, 100);
}

// Efecto de olas dinámico
function initWaveAnimation() {
  const waves = document.querySelectorAll('.wave');
  let time = 0;
  
  function animateWaves() {
    time += 0.005;
    
    waves.forEach((wave, index) => {
      const speed = 0.5 + (index * 0.1);
      const offset = Math.sin(time * speed) * 50;
      const scaleY = 0.8 + (Math.sin(time * speed + index) * 0.2);
      
      wave.style.transform = `translateX(${offset}px) scaleY(${scaleY})`;
    });
    
    requestAnimationFrame(animateWaves);
  }
  
  animateWaves();
}

// Manejo del formulario de contacto
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      try {
        // Mostrar estado de carga
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Enviar formulario usando FormSubmit
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Mostrar mensaje de éxito
          alert('¡Mensaje enviado con éxito! Te responderé lo antes posible.');
          contactForm.reset();
        } else {
          throw new Error('Error en el envío');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Por favor inténtalo nuevamente.');
      } finally {
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Ocultar contenido inicialmente para evitar flashes
  document.querySelector('body').style.visibility = 'hidden';
  
  // Inicializar componentes
  initTheme();
  setupAnimations();
  setupContactForm();
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