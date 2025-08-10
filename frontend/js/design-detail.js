// frontend/js/design-detail.js - COMPLETE AND CORRECTED

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GET THE HTML ELEMENTS ---
    const designContent = document.getElementById('design-content');
    
    // --- 2. GET THE PROJECT ID FROM THE URL ---
    // This looks at the URL (e.g., ...?id=5) and grabs the '5'
    const urlParams = new URLSearchParams(window.location.search);
    const designId = urlParams.get('id');

    // --- 3. THE CORE FUNCTION TO FETCH DATA ---
    async function fetchDesignDetails() {
        // First, check if we even have an ID. If not, show an error.
        if (!designId) {
            showErrorState('No project ID was found in the URL.');
            return;
        }

        // Construct the correct API URL for the specific project
        const API_URL = `http://127.0.0.1:8000/api/projects/${designId}/`;
        
        showLoadingState(); // Show the "Loading..." message

        try {
            const response = await fetch(API_URL);
            
            // If the server responds with an error (like 404 Not Found)
            if (!response.ok) {
                throw new Error(`The project could not be found. Status: ${response.status}`);
            }

            const design = await response.json();
            
            // Use a small delay for a smoother user experience
            setTimeout(() => {
                renderDesignDetails(design); // Call your existing function to display the data
            }, 500);

        } catch (error) {
            console.error('Failed to fetch design details:', error);
            showErrorState(error.message);
        }
    }

    // --- 4. YOUR EXISTING FUNCTION TO RENDER THE HTML (NO CHANGES NEEDED HERE) ---
    // In frontend/js/design-detail.js

function renderDesignDetails(design) {
    // Set the page title dynamically
    document.title = `${design.title} | Saneha Akhtar`;

    // --- Build the image gallery HTML ---
    // Start with the main image
    let imageGalleryHTML = `
        <div class="gallery-image-container">
            <img src="${design.main_image}" alt="${design.title}" class="gallery-image">
        </div>
    `;
    
    // The related_name in your model is 'images', so we use that here.
    if (design.images && design.images.length > 0) {
        design.images.forEach(img_data => {
            imageGalleryHTML += `
                <div class="gallery-image-container">
                    <img src="${img_data.image}" alt="${img_data.caption || 'Additional view'}" class="gallery-image">
                </div>
            `;
        });
    }

    // This is the new, clean HTML structure
    designContent.innerHTML = `
        <div class="detail-header">
            <h1 class="artwork-title">${design.title}</h1>
            <div class="artwork-meta">
                <span class="meta-tag">
                    <i class="fas fa-tag"></i>
                    ${design.category || 'Design'}
                </span>
            </div>
        </div>

        <!-- The Horizontal Scrolling Gallery -->
        <div class="artwork-gallery-wrapper">
            ${imageGalleryHTML}
        </div>

        <!-- Back to Studio Link -->
        <div class="detail-links">
            <a href="design.html" class="detail-link">
                <i class="fas fa-th-large"></i>
                Back to Studio
            </a>
        </div>
    `;
}

    // --- 5. HELPER FUNCTIONS FOR UI STATES ---
    function showLoadingState() {
        designContent.innerHTML = `
            <div class="detail-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading Design Details...</p>
            </div>
        `;
    }

    function showErrorState(message) {
        designContent.innerHTML = `
            <div class="detail-error">
                <h3>Oops! Something went wrong.</h3>
                <p>${message}</p>
                <a href="design.html" class="detail-link">Back to Studio</a>
            </div>
        `;
        // Add styles for .detail-error in your css if you haven't already
    }

    // --- 6. INITIALIZE THE PAGE ---
    // This is what kicks everything off when the page loads
    fetchDesignDetails();
});