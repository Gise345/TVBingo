// TV Bingo GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)'
    });

    // Floating Bubbles Animation
    gsap.to('.bubble-1', {
        y: -30,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    gsap.to('.bubble-2', {
        y: -40,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5
    });

    gsap.to('.bubble-3', {
        y: -20,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
    });

    gsap.to('.bubble-4', {
        y: -35,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.8
    });

    // Swordfish Swimming Animation
    const swordfish = document.getElementById('swordfish');
    
    if (swordfish) {
        // Initial swim across screen on page load
        gsap.to(swordfish, {
            x: window.innerWidth + 200,
            y: -100,
            rotation: 15,
            duration: 8,
            ease: 'none',
            onComplete: function() {
                // Reset position
                gsap.set(swordfish, { x: -200, y: 0, rotation: 0 });
            }
        });

        // Scroll-triggered swim animation
        gsap.to(swordfish, {
            scrollTrigger: {
                trigger: '#hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
            x: window.innerWidth / 2,
            y: -150,
            rotation: 10
        });

        // Pop-up effect when reaching features section
        ScrollTrigger.create({
            trigger: '#features-section',
            start: 'top center',
            onEnter: function() {
                gsap.timeline()
                    .to(swordfish, {
                        scale: 4,
                        rotation: 360,
                        duration: 0.8,
                        ease: 'power2.out'
                    })
                    .to(swordfish, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        ease: 'power2.in'
                    });
            }
        });
    }

    // Feature Cards Scroll Animation
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '#features-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
});