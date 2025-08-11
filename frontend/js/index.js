// Enhanced index.js with beautiful animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // --- TYPING ANIMATION (Tech-Oriented) ---
    const typingElement = document.getElementById('typing-animation');
    
    if (typingElement) {
        new Typed(typingElement, {
            strings: [
                'Full-Stack Developer',
                'UI/UX Designer.',
                'Graphic Designer.',
                'Creative Technologist.',
                'AI/ML Enthusiast.'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            smartBackspace: true,
            cursorChar: '|',
            shuffle: false,
            fadeOut: false,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500,
        });
    }

    // --- SCROLL ANIMATIONS ---
    if (typeof ScrollReveal !== 'undefined') {
        // Reveal for hero text elements
        ScrollReveal().reveal('.hero-text > *:not(.name-highlight)', {
            delay: 150, // Slightly increased delay
            distance: '40px', // More pronounced distance
            duration: 900, // Slower duration for smoother feel
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: 0,
            origin: 'bottom',
            scale: 0.95, // Subtle scale
            interval: 100 // Staggered interval
        });

        // Reveal for hero image
        ScrollReveal().reveal('.hero-image', {
            delay: 300, // Increased delay
            distance: '50px', // More pronounced distance
            duration: 1000, // Slower duration
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: 0,
            origin: 'right',
            scale: 0.92
        });

        // Reveal for section headers
        ScrollReveal().reveal('.section-header', {
            delay: 200,
            distance: '40px',
            duration: 900,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: 0,
            origin: 'top'
        });

        // Reveal for testimonial cards
        ScrollReveal().reveal('.testimonial-card', {
            delay: 150,
            distance: '50px',
            duration: 800,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            interval: 150, // More pronounced staggered animation
            opacity: 0,
            origin: 'bottom',
            scale: 0.9
        });
    }

    // --- ENHANCED TESTIMONIALS LOADING ---
    const testimonialsGrid = document.getElementById('testimonials-grid');
    // Using a placeholder API endpoint, replace with your actual API if needed
    const TESTIMONIALS_API_URL = 'https://SanehaAkhtar.pythonanywhere.com/api/testimonials/';

    async function fetchTestimonials() {
        if (!testimonialsGrid) return;

        testimonialsGrid.innerHTML = `
            <div class="testimonials-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Accessing Data Streams...</p>
            </div>
        `;

        try {
            // Use the correct API URL variableee
            const response = await fetch(TESTIMONIALS_API_URL); 
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // Map backend data to frontend format
            const testimonials = data.map(item => ({
                quote: item.quote,
                author: `${item.author_name}${item.author_title ? ', ' + item.author_title : ''}`
            }));

            setTimeout(() => {
                renderTestimonials(testimonials);
            }, 1200); // Optional: loading animation delay

        } catch (error) {
            console.error('Fetch error:', error);
            setTimeout(() => {
                testimonialsGrid.innerHTML = `
                    <div class="testimonials-loading" style="border-color: var(--ar-accent);">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3.5rem; color: var(--ar-accent); margin-bottom: var(--space-lg); text-shadow: 0 0 30px rgba(255, 105, 180, 0.5);"></i>
                        <h3 style="color: white; font-size: 1.8rem; font-weight: 700; margin-bottom: var(--space-sm); text-transform: uppercase; letter-spacing: 1px;">Transmission Failed</h3>
                        <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: var(--space-xl); line-height: 1.6; font-weight: 300;">Unable to load testimonials at the moment. Please check your network connection or try again later.</p>
                        <button onclick="location.reload()" class="btn-secondary" style="background: var(--ar-accent); color: white;">
                            <i class="fas fa-sync-alt"></i>
                            <span>Retry Data Stream</span>
                        </button>
                    </div>
                `;
            }, 1200);
        }
    }

    function renderTestimonials(testimonials) {
        testimonialsGrid.innerHTML = ''; // Clear loading state
        
        testimonials.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            // Staggered animation handled by CSS and ScrollReveal, but still useful for initial render
            card.style.animationDelay = `${index * 0.18}s`; // Adjusted stagger delay
            
            card.innerHTML = `
                <div class="testimonial-quote">${testimonial.quote}</div>
                <div class="testimonial-author">— ${testimonial.author}</div>
            `;
            
            testimonialsGrid.appendChild(card);
        });

        // Re-trigger ScrollReveal for new elements
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().sync();
        }
    }

    // --- SMOOTH SCROLLING FOR SCROLL INDICATOR ---
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const testimonialsSection = document.getElementById('testimonials-section');
            if (testimonialsSection) {
                testimonialsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // --- HERO BUTTONS FUNCTIONALITY ---
    const viewTechWorkBtn = document.getElementById('view-tech-work-btn');
    const viewDesignWorkBtn = document.getElementById('view-design-work-btn');
    const downloadCvBtn = document.getElementById('download-cv-btn');

    if (viewTechWorkBtn) {
        viewTechWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'projects.html'; // Navigate to CS Projects page
        });
    }

    if (viewDesignWorkBtn) {
        viewDesignWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'design.html'; // Navigate to Design Portfolio page
        });
    }

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // IMPORTANT: Replace 'assets/your-cv.pdf' with the actual path to your CV PDF file.
            // Make sure your CV PDF is placed in the 'assets' folder or 'public' folder of your project.
            const cvPath = '/assets/CV_SANEHAAKHTAR.pdf'; // Example: create this file in your assets folder
            window.open(cvPath, '_blank');
            console.log('Attempting to download CV from:', cvPath);
        });
    }

    // --- PARALLAX EFFECT FOR GRADIENT ORBS ---
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gradientOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.6; // Adjusted speed for more dynamic effect
            const x = (mouseX - 0.5) * speed * 50; // Adjusted movement range
            const y = (mouseY - 0.5) * speed * 50;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // --- INTERSECTION OBSERVER FOR ANIMATIONS (if needed beyond ScrollReveal) ---
    // This section can be simplified if ScrollReveal handles everything.
    // Keeping it as a general purpose observer if specific custom animations are needed.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // Add a class for CSS animations
            } else {
                entry.target.classList.remove('animate-in'); // Remove class when out of view (optional, for re-animating)
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-text > *, .hero-image, .section-header');
    animateElements.forEach(el => observer.observe(el));

    // --- CALL TESTIMONIALS FUNCTION ---
    fetchTestimonials();
});
