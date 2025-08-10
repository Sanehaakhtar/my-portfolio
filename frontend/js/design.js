// Enhanced Design Studio JavaScript - Perfect Alignment

document.addEventListener('DOMContentLoaded', () => {
    const designGrid = document.getElementById('design-grid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const API_URL = 'http://127.0.0.1:8000/api/projects/?project_type=DS';
    let projectsData = [];
    let currentFilter = 'all';

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

        ScrollReveal().reveal('.filter-tabs', {
            delay: 400,
            distance: '30px',
            duration: 800,
            opacity: 0,
            origin: 'bottom'
        });
    }

    // Enhanced fetch function
    async function fetchDesignProjects() {
        try {
            showLoadingState();
            
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            projectsData = await response.json();
            
            setTimeout(() => {
                renderDesignGrid(projectsData);
                initializeAnimations();
            }, 1000);
            
        } catch (error) {
            showErrorState();
            console.error('Fetch error:', error);
        }
    }

    // Show loading state
    function showLoadingState() {
        designGrid.innerHTML = `
            <div class="grid-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading creative projects...</p>
            </div>
        `;
    }

    // Show error state
    function showErrorState() {
        designGrid.innerHTML = `
            <div class="grid-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Connection Failed</h3>
                <p>Unable to load design projects. Please check your connection.</p>
                <button onclick="location.reload()" class="retry-button">
                    <i class="fas fa-refresh"></i>
                    Try Again
                </button>
            </div>
        `;
    }

    // Render perfectly aligned design grid
    function renderDesignGrid(projects) {
        const filteredProjects = currentFilter === 'all' 
            ? projects 
            : projects.filter(project => project.category === currentFilter);

        designGrid.innerHTML = '';
        
        if (filteredProjects.length === 0) {
            designGrid.innerHTML = `
                <div class="grid-loading">
                    <i class="fas fa-search" style="font-size: 3rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                    <p class="loading-text">No projects found for this category.</p>
                </div>
            `;
            return;
        }

        filteredProjects.forEach((project, index) => {
            const card = document.createElement('a');
            card.className = 'artwork-card';
            card.href = `design-detail.html?id=${project.id}`;
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="artwork-image">
                    <img src="${project.main_image || '/placeholder.svg?height=300&width=400&text=Design+Project'}" 
                    alt="${project.title}" loading="lazy">
                </div>
                <div class="artwork-content">
                    <h3 class="artwork-title">${project.title}</h3>
                    <p class="artwork-description">
                        ${project.description ? project.description.substring(0, 100) + '...' : 'Creative design project showcasing innovative visual solutions.'}
                    </p>
                    <div class="artwork-category">
                        <i class="fas fa-tag"></i>
                        ${project.category || 'Design'}
                    </div>
                </div>
                <div class="artwork-overlay">
                    <div class="artwork-overlay-content">
                        <h3>${project.title}</h3>
                        <p>Click to view full project</p>
                        <div class="view-project-btn">
                            <i class="fas fa-eye"></i>
                            View Project
                        </div>
                    </div>
                </div>
            `;
            
            designGrid.appendChild(card);
        });

        // Trigger ScrollReveal for new elements
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.artwork-card', {
                delay: 100,
                distance: '30px',
                duration: 600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                interval: 100,
                opacity: 0,
                origin: 'bottom',
                scale: 0.9
            });
        }
    }

    // Initialize animations
    function initializeAnimations() {
        const cards = document.querySelectorAll('.artwork-card');
        
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Filter functionality
    function handleFilterChange(filterValue) {
        currentFilter = filterValue;
        
        // Update active tab
        filterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === filterValue) {
                tab.classList.add('active');
            }
        });
        
        // Re-render grid with animation
        designGrid.style.opacity = '0';
        designGrid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            renderDesignGrid(projectsData);
            designGrid.style.opacity = '1';
            designGrid.style.transform = 'translateY(0)';
        }, 300);
    }

    // Filter tab event listeners
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.dataset.filter;
            handleFilterChange(filterValue);
        });
    });

    // Initialize page
    fetchDesignProjects();

    // Add parallax effect
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