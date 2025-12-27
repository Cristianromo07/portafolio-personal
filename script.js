/*
    SCRIPT PRINCIPAL
    - Animaciones al hacer scroll (Intersection Observer)
    - Menú hamburguesa para móvil
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    // Toggle del menú
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animación simple del icono
        hamburger.classList.toggle('open');
    });

    // Cerrar menú al hacer click en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer scroll (opcional para UX)
    window.addEventListener('scroll', () => {
        if(mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });


    // --- 2. ANIMACIONES AL SCROLL ---
    // Seleccionamos todos los elementos que queremos animar
    const animatedElements = document.querySelectorAll('.fade-in-up');

    // Configuración del observador
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observar una vez que ya se animó
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cada elemento
    animatedElements.forEach(el => observer.observe(el));


    // --- 3. EFECTO SMOOTH SCROLL PARA TODOS LOS LINKS INTERNOS ---
    // (Aunque CSS scroll-behavior: smooth funciona, esto es un fallback/refuerzo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Compensación por el header fijo
                const headerOffset = 70; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("Portafolio cargado correctamente. ¡Listo para impresionar!");
});
