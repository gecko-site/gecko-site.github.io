// ===== INICIALIZACIÓN ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init({publicKey: "L-BAzfch2akrFYIrM"});
    
    // Inicializar componentes
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initScrollToTop();
});

// ===== NAVEGACIÓN MÓVIL =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Cambiar apariencia del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll(
        '.product-card, .service-card, .feature, .contact-item, .hero-card'
    );
    
    elementsToAnimate.forEach((element, index) => {
        // Añadir delay escalonado
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        sendEmail();
    });
}

function sendEmail() {
    // Obtener datos del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Validación básica
    if (!name || !email || !message || !service) {
        showNotification('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return;
    }

    // Mostrar estado de carga
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Preparar parámetros para EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'No proporcionado',
        service: getServiceName(service),
        message: message,
        to_email: 'info@geckosolutions.bo'
    };

    // Enviar email
    emailjs.send('service_rmjb2jp', 'template_l9chp0v', templateParams)
        .then(function(response) {
            console.log('Email enviado exitosamente:', response);
            showNotification('¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            console.error('Error al enviar email:', error);
            showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.', 'error');
        })
        .finally(function() {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// ===== FUNCIONES AUXILIARES =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getServiceName(serviceValue) {
    const services = {
        'geckotaller': 'GeckoTaller - Sistema para talleres mecánicos',
        'geckorestaurant': 'GeckoRestaurant - Sistema para restaurantes',
        'geckofarma': 'GeckoFarma - Sistema para farmacias',
        'app-development': 'Desarrollo de aplicación móvil',
        'app-migration': 'Migración de aplicación',
        'app-update': 'Actualización de aplicación',
        'other': 'Otro servicio'
    };
    return services[serviceValue] || serviceValue;
}

function showNotification(message, type) {
    // Crear o actualizar notificación
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.querySelector('.contact-form').appendChild(notification);
    }

    // Configurar notificación
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.display = 'block';

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);

    // Scroll suave hacia la notificación
    notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== BOTÓN SCROLL TO TOP =====
function initScrollToTop() {
    // Crear botón
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #87C52F, #74a929);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(135, 197, 47, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Funcionalidad del botón
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efectos hover
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(135, 197, 47, 0.4)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(135, 197, 47, 0.3)';
    });
}

// ===== EFECTOS ADICIONALES =====

// Efecto de typing en el hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
}

// Contador animado para estadísticas
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 20);
    };

    // Observar contadores y animar cuando sean visibles
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Efecto parallax sutil en el hero
function initParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < heroSection.offsetHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// Prevenir errores de EmailJS si no está disponible
window.addEventListener('load', function() {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS no está disponible. El formulario de contacto puede no funcionar correctamente.');
    }
});

// Funciones de utilidad adicionales
const utils = {
    // Debounce function para optimizar eventos de scroll
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function para eventos frecuentes
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Detectar si el dispositivo soporta touch
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Obtener información del viewport
    getViewportSize: function() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    }
};

// Optimizar eventos de scroll con throttle
window.addEventListener('scroll', utils.throttle(function() {
    // Aquí van las funciones que dependen del scroll
}, 16)); // ~60fps

// Analytics básico (opcional)
function trackEvent(eventName, category, label) {
    // Placeholder para analytics
    console.log(`Event tracked: ${eventName} - ${category} - ${label}`);
    
    // Aquí podrías integrar Google Analytics, Mixpanel, etc.
    // gtag('event', eventName, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Tracking de interacciones importantes
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track clicks en botones importantes
    if (target.classList.contains('btn-primary')) {
        trackEvent('click', 'button', 'primary-cta');
    }
    
    if (target.classList.contains('product-btn')) {
        trackEvent('click', 'product', 'more-info');
    }
    
    // Track clicks en enlaces de contacto
    if (target.href && target.href.includes('wa.me')) {
        trackEvent('click', 'contact', 'whatsapp');
    }
    
    if (target.href && target.href.includes('mailto')) {
        trackEvent('click', 'contact', 'email');
    }
});

// Performance monitoring básico
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Página cargada en: ${loadTime}ms`);
                
                // Track performance si es muy lenta
                if (loadTime > 3000) {
                    trackEvent('performance', 'slow-load', loadTime);
                }
            }, 0);
        });
    }
}

// Inicializar medición de performance
measurePerformance();

// Detectar modo offline/online
window.addEventListener('online', function() {
    showNotification('Conexión restaurada', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Sin conexión a Internet', 'error');
});

// Funcionalidad PWA básica (Service Worker registration)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Aquí se registraría el service worker si lo implementas
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Manejo de formularios adicional
function initFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Limpiar errores al escribir
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Email no válido';
    } else if (field.type === 'tel' && value && !/^\+?[\d\s-()]+$/.test(value)) {
        isValid = false;
        errorMessage = 'Teléfono no válido';
    }

    // Mostrar/ocultar error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#dee2e6';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Inicializar validación de formularios
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});

// Función para alternar tema (futuro dark mode)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
});

// Exportar funciones para uso global si es necesario
window.GeckoSolutions = {
    showNotification,
    trackEvent,
    toggleTheme,
    utils
};