// js/animations.js
document.addEventListener('DOMContentLoaded', () => {

    // Initialize ScrollReveal
    const sr = ScrollReveal({
        distance: '60px',
        duration: 1500,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false // Animations only play once
    });

    // --- General Animations ---
    sr.reveal('.page-title', { delay: 200, origin: 'top' });
    sr.reveal('.nav-logo, .nav-links li, .nav-toggle', { delay: 200, origin: 'top', interval: 100 });

    // --- Home Page Animations ---
    sr.reveal('.hero-text h1, .hero-text h2, .hero-text p', { delay: 200, origin: 'left', interval: 150 });
    sr.reveal('.hero-image', { delay: 300, origin: 'right', distance: '100px' });
    sr.reveal('.testimonial-card', { origin: 'bottom', interval: 100 });

    // --- CS Projects Page Animations ---
    sr.reveal('.ide-sidebar', { delay: 200, origin: 'left' });
    sr.reveal('.ide-main-content', { delay: 300, origin: 'right' });

    // --- Design Page Animations ---
    sr.reveal('.artwork-card', { origin: 'bottom', interval: 80 });
    
    // --- Experience Page Animations ---
    sr.reveal('.timeline-item', { origin: 'bottom', interval: 150 });
    
    // --- Contact Page Animations ---
    sr.reveal('.contact-card', { origin: 'bottom', interval: 100 });

});