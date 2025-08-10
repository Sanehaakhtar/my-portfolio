// Enhanced CS Projects JavaScript - Beautiful Horizontal Cards

document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const API_URL = 'http://SanehaAkhtar.pythonanywhere.com/api/projects/?project_type=CS'
    let projectsData = [];

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.page-header', {
            delay: 200,
            distance: '50px',
            duration: 800,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            opacity: 0,
            origin: 'top'
        });
    }

    // Enhanced fetch function
    async function fetchProjects() {
        try {
            showLoadingState();
            
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            projectsData = await response.json();
            
            setTimeout(() => {
                renderProjectsGrid(projectsData);
                initializeAnimations();
            }, 1200);
            
        } catch (error) {
            showErrorState();
            console.error('Fetch error:', error);
        }
    }

    // Show loading state
    function showLoadingState() {
        projectsGrid.innerHTML = `
            <div class="projects-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Initializing projects...</p>
            </div>
        `;
    }

    // Show error state
    function showErrorState() {
        projectsGrid.innerHTML = `
            <div class="projects-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Connection Failed</h3>
                <p>Unable to load projects. Please check your connection.</p>
                <button onclick="location.reload()" class="retry-button">
                    <i class="fas fa-refresh"></i>
                    Retry Connection
                </button>
            </div>
        `;
    }

    // Render beautiful horizontal cards
    function renderProjectsGrid(projects) {
        projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="projects-loading">
                    <i class="fas fa-code" style="font-size: 3rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                    <p class="loading-text">No projects available at the moment.</p>
                </div>
            `;
            return;
        }

        projects.forEach((project, index) => {
            const card = document.createElement('a');
            card.className = 'project-card';
            card.href = `project-detail.html?id=${project.id}`;
            card.style.animationDelay = `${index * 0.1}s`;

            // Parse tech stack into tags
            const techStack = project.tech_stack ? project.tech_stack.split(',').map(tech => tech.trim()) : [];

            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image || '/placeholder.svg?height=200&width=300&text=Project+Image'}" 
                         alt="${project.title}" loading="lazy">
                    <div class="project-image-overlay">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">
                            ${project.description ? project.description.substring(0, 150) + '...' : 'Innovative software solution with cutting-edge technology implementation.'}
                        </p>
                    </div>
                    <div class="project-tech-stack">
                        ${techStack.slice(0, 4).map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                        ${techStack.length > 4 ? `<span class="tech-tag">+${techStack.length - 4} more</span>` : ''}
                    </div>
                    <div class="project-footer">
                        <div class="project-meta">
                            <span><i class="fas fa-calendar"></i> 2024</span>
                            <span><i class="fas fa-tag"></i> Development</span>
                        </div>
                        <div class="project-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });

        // Trigger ScrollReveal for new elements
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.project-card', {
                delay: 100,
                distance: '30px',
                duration: 600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                interval: 150,
                opacity: 0,
                origin: 'bottom',
                scale: 0.9
            });
        }
    }

    // Initialize animations and interactions
    function initializeAnimations() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });

            // Add click ripple effect
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(0, 212, 170, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                card.style.position = 'relative';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize the page
    fetchProjects();

    // Add parallax effect for background
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 30;
            const y = (mouseY - 0.5) * speed * 30;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});