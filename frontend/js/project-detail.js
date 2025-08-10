// Project Detail Page JavaScript - Beautiful Tech Theme

document.addEventListener('DOMContentLoaded', () => {
    const projectContent = document.getElementById('project-content');
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // API endpoint for fetching project details
    const API_URL = `//sanehaakhtar.pythonanywhere.com/api/projects/${projectId}/`;
        

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.back-navigation', {
            delay: 200,
            distance: '30px',
            duration: 800,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            opacity: 0,
            origin: 'left'
        });
    }

    // Fetch project details
    async function fetchProjectDetails() {
        if (!projectId) {
            showErrorState('No project ID provided');
            return;
        }

        try {
            showLoadingState();
            
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const project = await response.json();
            
            setTimeout(() => {
                renderProjectDetails(project);
                initializeAnimations();
            }, 1200);
            
        } catch (error) {
            showErrorState('Failed to load project details');
            console.error('Fetch error:', error);
        }
    }

    // Show loading state
    function showLoadingState() {
        projectContent.innerHTML = `
            <div class="detail-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading project details...</p>
            </div>
        `;
    }

    // Show error state
    function showErrorState(message) {
        projectContent.innerHTML = `
            <div class="detail-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <a href="projects.html" class="project-link">
                    <i class="fas fa-arrow-left"></i>
                    Back to Projects
                </a>
            </div>
        `;
    }

    // Render project details
    function renderProjectDetails(project) {
        // Images
        let imagesHtml = '';
        if (project.images && project.images.length > 0) {
            imagesHtml = `
                <div class="project-gallery">
                    ${project.images.map(img => `
                        <img src="${img.image}" alt="${img.caption || project.title}" class="project-gallery-image" loading="lazy">
                    `).join('')}
                </div>
            `;
        }

        // Videos
        let videosHtml = '';
        if (project.videos && project.videos.length > 0) {
            videosHtml = `
                <div class="project-videos">
                    ${project.videos.map(vid => `
                        <video controls class="project-video">
                            <source src="${vid.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `).join('')}
                </div>
            `;
        }

        const techStack = project.tech_stack ? project.tech_stack.split(',').map(tech => tech.trim()) : [];
        
        projectContent.innerHTML = `
            <!-- Project Header -->
            <div class="project-header">
                <h1 class="project-title">${project.title}</h1>
                <p class="project-subtitle">${project.description || 'Innovative software solution with cutting-edge technology implementation.'}</p>
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>2024</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>Development</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-code"></i>
                        <span>Full Stack</span>
                    </div>
                </div>
            </div>

            <!-- Project Image -->
            ${project.image ? `
                <div class="project-image-section">
                    <img src="${project.image}" alt="${project.title}" class="project-main-image" loading="lazy">
                </div>
            ` : ''}

            <!-- Problem Statement -->
            <div class="project-section">
                <h2 class="section-title">
                    <i class="fas fa-exclamation-circle"></i>
                    Problem Statement
                </h2>
                <div class="section-content">
                    ${project.problem_statement || 'This project addresses complex technical challenges through innovative software solutions, implementing modern development practices and cutting-edge technologies to deliver exceptional user experiences.'}
                </div>
            </div>

            <!-- My Role -->
            <div class="project-section">
                <h2 class="section-title">
                    <i class="fas fa-user-cog"></i>
                    My Role & Responsibilities
                </h2>
                <div class="section-content">
                    ${project.my_role || 'As the lead developer, I was responsible for the complete software development lifecycle, from initial concept and architecture design to implementation, testing, and deployment. This included frontend development, backend API design, database optimization, and ensuring scalable, maintainable code.'}
                </div>
            </div>

            <!-- Key Challenges -->
            <div class="project-section">
                <h2 class="section-title">
                    <i class="fas fa-mountain"></i>
                    Key Challenges & Solutions
                </h2>
                <div class="section-content">
                    ${project.key_challenges || 'The project presented several technical challenges including performance optimization, scalability concerns, and complex user interface requirements. These were addressed through careful architecture planning, implementation of efficient algorithms, and adoption of modern development frameworks and best practices.'}
                </div>
            </div>

            <!-- Tech Stack -->
            <div class="project-section">
                <h2 class="section-title">
                    <i class="fas fa-cogs"></i>
                    Technology Stack
                </h2>
                <div class="section-content">
                    <p>This project leverages a modern technology stack to ensure optimal performance, scalability, and maintainability:</p>
                    <div class="tech-stack-grid">
                        ${techStack.length > 0 ? techStack.map(tech => `
                            <div class="tech-item">
                                <i class="fas fa-code"></i>
                                <span>${tech}</span>
                            </div>
                        `).join('') : `
                            <div class="tech-item">
                                <i class="fab fa-js-square"></i>
                                <span>JavaScript</span>
                            </div>
                            <div class="tech-item">
                                <i class="fab fa-react"></i>
                                <span>React</span>
                            </div>
                            <div class="tech-item">
                                <i class="fab fa-node-js"></i>
                                <span>Node.js</span>
                            </div>
                            <div class="tech-item">
                                <i class="fas fa-database"></i>
                                <span>MongoDB</span>
                            </div>
                        `}
                    </div>
                </div>
            </div>

            <!-- Key Learnings -->
            <div class="project-section">
                <h2 class="section-title">
                    <i class="fas fa-lightbulb"></i>
                    Key Learnings & Outcomes
                </h2>
                <div class="section-content">
                    ${project.learnings || 'This project significantly enhanced my technical skills and provided valuable insights into modern software development practices. Key learnings include advanced problem-solving techniques, performance optimization strategies, and the importance of clean, maintainable code architecture. The project successfully delivered all requirements while exceeding performance expectations.'}
                </div>
            </div>

            <!-- Project Links -->
            <div class="project-links">
                ${project.project_url ? `
                    <a href="${project.project_url}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Live Project</span>
                    </a>
                ` : ''}
                ${project.github_url ? `
                    <a href="${project.github_url}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                        <span>View Source Code</span>
                    </a>
                ` : ''}
                <a href="projects.html" class="project-link">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Projects</span>
                </a>
            </div>
        `;
    }

    // Initialize animations
    function initializeAnimations() {
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.project-header', {
                delay: 200,
                distance: '50px',
                duration: 800,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                opacity: 0,
                origin: 'top'
            });

            ScrollReveal().reveal('.project-section, .project-image-section', {
                delay: 100,
                distance: '30px',
                duration: 600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                interval: 200,
                opacity: 0,
                origin: 'bottom'
            });

            ScrollReveal().reveal('.project-links', {
                delay: 400,
                distance: '30px',
                duration: 800,
                opacity: 0,
                origin: 'bottom'
            });
        }
    }

    // Initialize the page
    fetchProjectDetails();

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