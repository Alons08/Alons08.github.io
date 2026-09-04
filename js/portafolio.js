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
  
  // Prioridad: localStorage > preferencia del sistema > modo día
  let theme;
  if (savedTheme) {
    theme = savedTheme;
  } else {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  body.setAttribute('data-theme', theme);
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
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

// ===== Sistema de idiomas (ES/EN) =====
const translations = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.subtitle': 'Desarrollador web back-end especializado en Spring Boot y Bachiller en Ingeniería de Sistemas e Informática',
    'hero.projectsBtn': 'Ver Proyectos',
    'hero.contactBtn': 'Contáctame',
    'about.title': 'Sobre mí',
    'about.text': 'Hola, soy Alonso Ariam Leandro Quispe, desarrollador web back-end especializado en Spring Boot, con una gran pasión por la programación y la creación de soluciones eficientes. Actualmente soy Bachiller en Ingeniería de Sistemas por la UTP. Además, fui ganador de un concurso de programación, lo que reafirma mi compromiso con la resolución creativa de problemas.',
    'about.github': 'GitHub',
    'about.linkedin': 'LinkedIn',
    'about.cv': 'Currículum',
    'about.viewProfile': 'Ver Perfil',
    'about.downloadCv': 'Descargar CV',
    'skills.title': 'Mis Habilidades',
    'projects.title': 'Mis Proyectos',
    'projects.filterAll': 'Todos',
    'projects.filterWeb': 'Web',
    'projects.filterDesktop': 'Escritorio',
    'projects.btnApp': 'App',
    'projects.btnVideo': 'Video',
    'projects.btnCode': 'Código',
    'projects.p1.desc': 'Sistema SaaS de Punto de Venta con gestión de ventas e inventario, dashboards en tiempo real y reportes para restaurantes que optimizan procesos y mejoran la eficiencia.',
    'projects.p2.desc': 'Videojuego web educativo con sistema de registro y autenticación, ranking global en tiempo real y múltiples categorías temáticas para competir y desafiar tus conocimientos.',
    'projects.p3.title': 'Restaurante Campestre "Los Gemelos"',
    'projects.p3.desc': 'Plataforma web con funcionalidades de e-commerce. Permite navegar por la carta, gestionar pedidos en carrito, completar datos de entrega y finalizar compras vía WhatsApp automático.',
    'projects.p4.title': 'Ositos Sorpresa Piery',
    'projects.p4.desc': 'Plataforma web con catálogo de 3 paquetes personalizables, galería interactiva de trabajos realizados y sistema de reservas automáticas integrado con WhatsApp.',
    'projects.p5.title': 'Sistema Canal de "Chinecas"',
    'projects.p5.desc': 'Desarrollada con Spring Boot y MySQL para gestionar agricultores, parcelas y el consumo de agua, optimizando la administración hídrica del canal.',
    'projects.p6.title': 'Tienda de Ropa "KingsMan"',
    'projects.p6.desc': 'Desarrollada con HTML, CSS, JavaScript y MySQL para gestionar productos, carrito de compras y formularios con validaciones básicas.',
    'projects.p7.title': 'Sistema Colegio "Santa Rosa de Lima"',
    'projects.p7.desc': 'Aplicación de escritorio desarrollada con Java y MySQL para gestionar alumnos, docentes, matrículas, notas y pagos en el colegio Santa Rosa de Lima.',
    'projects.p8.title': 'Supermarket "NIBBLE"',
    'projects.p8.desc': 'Aplicación de escritorio desarrollada en Java y SQL Server para gestionar productos, empleados, clientes y promociones, optimizando la operación del supermercado.',
    'contact.title': 'Contacto',
    'contact.headerTitle': '¡Hablemos!',
    'contact.headerSub': 'Disponible para colaboraciones',
    'contact.sendMessage': 'Enviar mensaje',
    'contact.emailTitle': 'Correo Electrónico',
    'contact.sendEmail': 'Enviar correo',
    'contact.hours': 'Lunes a domingo, 9am - 11pm',
    'contact.quickResponse': 'Respuesta rápida',
    'footer.rights': 'Todos los derechos reservados.'
  },
  en: {
    'nav.about': 'About me',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Back-end web developer specialized in Spring Boot and Bachelor in Systems and Computer Engineering',
    'hero.projectsBtn': 'View Projects',
    'hero.contactBtn': 'Contact me',
    'about.title': 'About me',
    'about.text': 'Hi, I am Alonso Ariam Leandro Quispe, a back-end web developer specialized in Spring Boot, with a great passion for programming and creating efficient solutions. I am currently a Bachelor in Systems Engineering from UTP. In addition, I was a winner of a programming contest, which reinforces my commitment to creative problem solving.',
    'about.github': 'GitHub',
    'about.linkedin': 'LinkedIn',
    'about.cv': 'Resume',
    'about.viewProfile': 'View Profile',
    'about.downloadCv': 'Download CV',
    'skills.title': 'My Skills',
    'projects.title': 'My Projects',
    'projects.filterAll': 'All',
    'projects.filterWeb': 'Web',
    'projects.filterDesktop': 'Desktop',
    'projects.btnApp': 'App',
    'projects.btnVideo': 'Video',
    'projects.btnCode': 'Code',
    'projects.p1.desc': 'SaaS Point of Sale system with sales and inventory management, real-time dashboards and reports for restaurants that optimize processes and improve efficiency.',
    'projects.p2.desc': 'Educational web game with registration and authentication system, real-time global ranking and multiple thematic categories to compete and challenge your knowledge.',
    'projects.p3.title': '"Los Gemelos" Country Restaurant',
    'projects.p3.desc': 'Web platform with e-commerce features. Browse the menu, manage cart orders, complete delivery information and finalize purchases via automated WhatsApp.',
    'projects.p4.title': 'Ositos Sorpresa Piery',
    'projects.p4.desc': 'Web platform with a catalog of 3 customizable packages, interactive gallery of past work and a booking system integrated with WhatsApp.',
    'projects.p5.title': '"Chinecas" Canal System',
    'projects.p5.desc': 'Developed with Spring Boot and MySQL to manage farmers, plots and water consumption, optimizing the water administration of the canal.',
    'projects.p6.title': '"KingsMan" Clothing Store',
    'projects.p6.desc': 'Developed with HTML, CSS, JavaScript and MySQL to manage products, shopping cart and forms with basic validations.',
    'projects.p7.title': '"Santa Rosa de Lima" School System',
    'projects.p7.desc': 'Desktop application developed with Java and MySQL to manage students, teachers, enrollments, grades and payments at the Santa Rosa de Lima school.',
    'projects.p8.title': '"NIBBLE" Supermarket',
    'projects.p8.desc': 'Desktop application developed in Java and SQL Server to manage products, employees, customers and promotions, optimizing supermarket operations.',
    'contact.title': 'Contact',
    'contact.headerTitle': "Let's talk!",
    'contact.headerSub': 'Available for collaborations',
    'contact.sendMessage': 'Send message',
    'contact.emailTitle': 'Email',
    'contact.sendEmail': 'Send email',
    'contact.hours': 'Monday to Sunday, 9am - 11pm',
    'contact.quickResponse': 'Quick response',
    'footer.rights': 'All rights reserved.'
  }
};

const langToggle = document.getElementById('lang-toggle');
const htmlElement = document.documentElement;

// Aplicar el idioma seleccionado a todos los elementos con data-i18n
function applyLanguage(lang) {
  const dict = translations[lang] || translations.es;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });
  htmlElement.setAttribute('lang', lang);
  langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
}

// Inicializar idioma desde localStorage o español
function initLanguage() {
  const savedLang = localStorage.getItem('lang');
  const lang = (savedLang === 'en' || savedLang === 'es') ? savedLang : 'es';
  applyLanguage(lang);
}

// Cambiar idioma
langToggle.addEventListener('click', () => {
  const currentLang = htmlElement.getAttribute('lang') || 'es';
  const newLang = currentLang === 'es' ? 'en' : 'es';
  applyLanguage(newLang);
  localStorage.setItem('lang', newLang);
});

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
  initLanguage();
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