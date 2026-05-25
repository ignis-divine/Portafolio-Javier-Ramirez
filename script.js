// ==========================================
// MENÚ HAMBURGUESA
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(15, 15, 30, 0.95)';
    navLinks.style.padding = '2rem 1rem';
    navLinks.style.gap = '1rem';
    navLinks.style.borderBottom = '1px solid rgba(0, 102, 255, 0.2)';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Crear mensaje para enviar por email
        const mailtoLink = `mailto:javier.ramirezclz10@gmail.com?subject=Nuevo mensaje de ${name}&body=De: ${email}%0D%0A%0D%0A${message}`;
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// ==========================================
// SCROLL SMOOTH
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// ANIMACIÓN AL HACER SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==========================================
// BARRA DE HABILIDADES ANIMADA
// ==========================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const parentBar = skillProgress.parentElement;
            const skillSection = parentBar.closest('.skill-category');
            
            if (!skillSection.classList.contains('animated')) {
                skillProgress.style.animation = 'fillBar 1.5s ease forwards';
                skillSection.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Agregar animación CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fillBar {
        from {
            width: 0 !important;
        }
        to {
            width: var(--final-width);
        }
    }
`;
document.head.appendChild(style);

// Establecer el ancho final de cada barra
skillBars.forEach(bar => {
    const finalWidth = window.getComputedStyle(bar).width;
    bar.style.setProperty('--final-width', finalWidth);
    bar.style.width = '0';
});

// ==========================================
// EFECTOS DE HOVER EN TARJETAS
// ==========================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// CONTADOR ANIMADO DE ESTADÍSTICAS
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent.replace(/\D/g, '');
            const target = parseInt(text);
            
            if (!isNaN(target)) {
                animateCounter(h3, target);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// DETECTAR SCROLL Y CAMBIAR NAVBAR
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 102, 255, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 102, 255, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// VALIDACIÓN DE FORMULARIO
// ==========================================

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 10px rgba(0, 102, 255, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(0, 102, 255, 0.3)';
            this.style.boxShadow = 'none';
        });
    });
}

// ==========================================
// LAZY LOADING DE IMÁGENES
// ==========================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// COPIAR EMAIL AL HACER CLIC
// ==========================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        // Copiar al portapapeles
        navigator.clipboard.writeText(email).then(() => {
            const originalText = this.textContent;
            this.textContent = '¡Copiado!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

console.log('✅ Portafolio cargado correctamente');
console.log('👋 ¡Hola! Bienvenido al portafolio de Cesar Javier Ramírez');
