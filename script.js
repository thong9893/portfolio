document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Intersection Observer for 'Scroll Reveal' effect
    const revealElements = document.querySelectorAll('.section, .timeline-item, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing after it has been revealed once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // 3. Staggered Timeline Entrance (optional, handles reveal for timeline items only)
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Apply a staggered delay to the transition for each item
        item.style.transitionDelay = `${index * 0.15}s`;
    });
});