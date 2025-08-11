document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.getElementById('timeline');
    const yearsExperienceEl = document.getElementById('years-experience');
    const projectsCompletedEl = document.getElementById('projects-completed');
    const technologiesMasteredEl = document.getElementById('technologies-mastered');
    const clientSatisfactionEl = document.getElementById('client-satisfaction');

    async function fetchExperienceData() {
        if (!timelineContainer) return;

        try {
            timelineContainer.innerHTML = `
                <div class="timeline-loading">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Loading professional journey...</p>
                </div>
            `;

            const response = await fetch('/api/experience');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            setTimeout(() => {
                renderExperience(data);
                updateStats(data);
            }, 800); // Small delay for loading animation
            
        } catch (error) {
            console.error('Failed to fetch experience data:', error);
            timelineContainer.innerHTML = `
                <div class="timeline-loading error-state">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: var(--danger); margin-bottom: var(--space-4);"></i>
                    <h3 style="color: var(--text-primary); font-size: 1.5rem; font-weight: 600; margin-bottom: var(--space-2);">Data Stream Interrupted</h3>
                    <p style="color: var(--text-muted); margin-bottom: var(--space-6);">Unable to load experience data. Please try refreshing the page.</p>
                    <button onclick="location.reload()" class="btn-primary">
                        <i class="fas fa-sync-alt"></i>
                        <span>Retry</span>
                    </button>
                </div>
            `;
        }
    }

    function renderExperience(experiences) {
        timelineContainer.innerHTML = ''; // Clear loading state

        experiences.forEach((exp, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.setAttribute('data-aos', 'fade-up'); // For ScrollReveal

            const skillsHtml = exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');

            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content glass-card">
                    <h3 class="job-title">${exp.role}</h3>
                    <p class="company-name">${exp.company}</p>
                    <p class="duration-location">
                        <i class="far fa-calendar-alt"></i> ${exp.startDate} - ${exp.endDate} 
                        <span class="separator">|</span> 
                        <i class="fas fa-map-marker-alt"></i> ${exp.locationType}
                    </p>
                    ${exp.description ? `<p class="job-description">${exp.description}</p>` : ''}
                    <div class="skills-list">
                        ${skillsHtml}
                    </div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });

        // Re-initialize ScrollReveal for newly added elements
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.timeline-item', {
                delay: 150,
                distance: '40px',
                duration: 900,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                opacity: 0,
                origin: 'bottom',
                interval: 100
            });
        }
    }

    function updateStats(experiences) {
        // Calculate Years Experience
        let totalYears = 0;
        experiences.forEach(exp => {
            const startYear = parseInt(exp.startDate.split(' ')[1]);
            const endYear = exp.endDate === 'Present' ? new Date().getFullYear() : parseInt(exp.endDate.split(' ')[1]);
            totalYears += (endYear - startYear);
        });
        // Simple approximation, can be made more precise if needed
        const uniqueYears = new Set();
        experiences.forEach(exp => {
            const startYear = parseInt(exp.startDate.split(' ')[1]);
            const endYear = exp.endDate === 'Present' ? new Date().getFullYear() : parseInt(exp.endDate.split(' ')[1]);
            for (let y = startYear; y <= endYear; y++) {
                uniqueYears.add(y);
            }
        });
        const calculatedYears = uniqueYears.size > 0 ? uniqueYears.size - 1 : 0; // Adjust for continuous experience

        // Count Projects (placeholder, as data doesn't have project count)
        // For now, let's assume each experience is a "project" or use a fixed number
        const projectsCount = experiences.length * 2; // Arbitrary multiplier for demo

        // Count Unique Technologies
        const allSkills = experiences.flatMap(exp => exp.skills);
        const uniqueSkills = new Set(allSkills);
        const technologiesCount = uniqueSkills.size;

        // Client Satisfaction (placeholder)
        const clientSat = 100; // Fixed for demo

        animateNumber(yearsExperienceEl, calculatedYears);
        animateNumber(projectsCompletedEl, projectsCount);
        animateNumber(technologiesMasteredEl, technologiesCount);
        animateNumber(clientSatisfactionEl, clientSat);
    }

    function animateNumber(element, targetNumber) {
        let currentNumber = 0;
        const duration = 1500; // milliseconds
        const stepTime = 10; // milliseconds
        const steps = duration / stepTime;
        const increment = targetNumber / steps;

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber).toString();
        }, stepTime);
    }

    fetchExperienceData();
});
