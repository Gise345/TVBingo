// TV Bingo - Preloader Script
// Hide preloader when page is fully loaded

window.addEventListener('load', function() {
    // Add a small delay for better UX
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove preloader from DOM after animation completes
        setTimeout(function() {
            const overlay = document.querySelector('.overlay');
            const preloader = document.querySelector('.preloader');
            
            if (overlay) {
                overlay.remove();
            }
            if (preloader) {
                preloader.remove();
            }
        }, 500);
    }, 800); // Show preloader for at least 800ms
});

// Fallback: Force hide after 5 seconds if page hasn't loaded
setTimeout(function() {
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
    }
}, 5000);