document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. NAVBAR LOADER ---
    loadComponent('navbar-container', 'components/navbar.html', () => {
        // No mode toggle to initialize anymore
        setActiveNavLink();
    });

    // --- 2. FOOTER LOADER ---
    loadComponent('footer-container', 'components/footer.html');

    // --- HELPER FUNCTION FOR LOADING COMPONENTS ---
    function loadComponent(elementId, url, callback) {
        const container = document.getElementById(elementId);
        if (container) {
            fetch(url)
                .then(response => response.ok ? response.text() : Promise.reject('File not found'))
                .then(data => {
                    container.innerHTML = data;
                    if (callback) callback();
                })
                .catch(error => console.error(`Failed to load ${url}:`, error));
        }
    }

    // --- SET ACTIVE NAVBAR LINK ---
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentPath = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            // Remove 'active' class from all links first
            link.classList.remove('active');
            
            // Check if href matches current path (or is index.html for root)
            let linkHref = link.getAttribute('href');
            if (linkHref === '' || linkHref === 'index.html') { // Handle root/homepage
                if (currentPath === '' || currentPath === 'index.html') {
                    link.classList.add('active');
                }
            } else if (linkHref === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Removed the initializeModeToggle function as theme toggle is no longer needed.
});
