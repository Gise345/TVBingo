// TV Bingo - GSAP Scroll Animations
// Make sure GSAP and ScrollTrigger are loaded before this script

gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    
    // CRITICAL: Force all elements to be visible first
    gsap.set([
        '.feature-card', 
        '.game-item', 
        '.banner-content', 
        '.section-header', 
        '.why-item', 
        '.how-item',
        '.how-item *',
        '.how-section *',
        '.faq-item'
    ], {
        opacity: 1,
        visibility: 'visible',
        clearProps: 'none'
    });
    
    // ===================================
    // BANNER SECTION ANIMATIONS
    // ===================================
    
    // Banner content slides in from left
    gsap.from('.banner-content', {
        scrollTrigger: {
            trigger: '.banner-section-secondary',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all'
    });

    // Banner title animates in with scale
    gsap.from('.banner-content__title', {
        scrollTrigger: {
            trigger: '.banner-section-secondary',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    });

    // Banner subtitle fades in
    gsap.from('.banner-content__subtitle', {
        scrollTrigger: {
            trigger: '.banner-section-secondary',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        clearProps: 'all'
    });

    // Banner buttons pop in
    gsap.from('.banner-content .button-wrapper .cmn--btn', {
        scrollTrigger: {
            trigger: '.banner-section-secondary',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    });

    // Banner thumb slides in from right with rotation
    gsap.from('.banner-thumb', {
        scrollTrigger: {
            trigger: '.banner-section-secondary',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        rotation: 15,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        clearProps: 'all'
    });

    // ===================================
    // FEATURES SECTION ANIMATIONS
    // ===================================
    
    // Section header slides down
    gsap.from('.features-section .section-header', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Feature cards pop in one by one with bounce
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            once: false
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        rotation: -10,
        clearProps: 'all'
    });

    // Feature icons spin in
    gsap.from('.feature-card__icon', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            once: false
        },
        rotation: 360,
        scale: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
    });

    // ===================================
    // ABOUT SECTION ANIMATIONS
    // ===================================
    
    // About content slides in from left
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // About image slides in from right with parallax effect
    gsap.from('.about-thumb img', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all'
    });

    // About button pops in
    gsap.from('.about-content .cmn--btn', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.7)'
    });

    // ===================================
    // GAME SECTION ANIMATIONS
    // ===================================
    
    // Game section header zooms in
    gsap.from('.game-section .section-header', {
        scrollTrigger: {
            trigger: '.game-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Game cards cascade in with flip effect
    gsap.from('.game-item', {
        scrollTrigger: {
            trigger: '.game-section',
            start: 'top 65%',
            toggleActions: 'play none none reverse',
            once: false
        },
        rotationY: 90,
        opacity: 0,
        duration: 0.8,
        stagger: {
            each: 0.1,
            from: 'start'
        },
        ease: 'power2.out',
        transformPerspective: 1000,
        clearProps: 'all'
    });

    // Game item hover animation
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ===================================
    // WHY CHOOSE US SECTION ANIMATIONS
    // ===================================
    
    // Why section header slides in from top
    gsap.from('.why-section .section-header', {
        scrollTrigger: {
            trigger: '.why-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Why items slide up with stagger
    gsap.from('.why-item', {
        scrollTrigger: {
            trigger: '.why-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Why item icons rotate in
    gsap.from('.why-item__thumb i', {
        scrollTrigger: {
            trigger: '.why-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        rotation: 180,
        scale: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // ===================================
    // HOW TO PLAY SECTION ANIMATIONS
    // ===================================
    
    // FORCE visibility for How section
    setTimeout(() => {
        const howSection = document.querySelector('.how-section');
        if (howSection) {
            howSection.style.opacity = '1';
            howSection.style.visibility = 'visible';
            const allHowElements = howSection.querySelectorAll('*');
            allHowElements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
        }
    }, 100);
    
    // How section header bounces in
    gsap.from('.how-section .section-header', {
        scrollTrigger: {
            trigger: '.how-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: -50,
        duration: 0.8,
        ease: 'bounce.out',
        clearProps: 'transform'
    });

    // How items slide up - SIMPLE VERSION
    gsap.from('.how-item', {
        scrollTrigger: {
            trigger: '.how-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'transform'
    }); // appear in sequence with number badges
    gsap.from('.how-item', {
        scrollTrigger: {
            trigger: '.how-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            once: false
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.25,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    });

    // Badge numbers pulse in
    gsap.from('.how-item .badge', {
        scrollTrigger: {
            trigger: '.how-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            once: false
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.25,
        delay: 0.2,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'all'
    });

    // ===================================
    // FAQ SECTION ANIMATIONS
    // ===================================
    
    // FAQ header fades in with scale
    gsap.from('.faq-section .section-header', {
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // FAQ items alternate slide in (left and right)
    gsap.from('.faq-section .col-lg-6:first-child .faq-item', {
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.faq-section .col-lg-6:last-child .faq-item', {
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // FAQ item hover effect
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                x: 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ===================================
    // TOP WINNERS/INVESTORS SECTION
    // ===================================
    
    // Part titles slide down
    gsap.from('.top-section .part-title', {
        scrollTrigger: {
            trigger: '.top-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Investor items pop in
    gsap.from('.investor-item', {
        scrollTrigger: {
            trigger: '.top-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Center CTA wrapper zooms in
    gsap.from('.cla-wrapper', {
        scrollTrigger: {
            trigger: '.top-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // ===================================
    // TESTIMONIAL SECTION ANIMATIONS
    // ===================================
    
    // Testimonial header slides in
    gsap.from('.testimonial-section .section-header', {
        scrollTrigger: {
            trigger: '.testimonial-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Testimonial items fade and slide up
    gsap.from('.testimonial-item', {
        scrollTrigger: {
            trigger: '.testimonial-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // ===================================
    // FOOTER ANIMATIONS
    // ===================================
    
    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // ===================================
    // PARALLAX EFFECTS ON SCROLL
    // ===================================
    
    // Parallax for shape elements
    gsap.utils.toArray('.shapes .shape').forEach(shape => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: shape.closest('section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });
    });

    // Floating animation for banner thumb
    gsap.to('.banner-thumb .animate-float', {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // ===================================
    // BUTTON HOVER ANIMATIONS
    // ===================================
    
    const buttons = document.querySelectorAll('.cmn--btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ===================================
    // CARD HOVER EFFECTS
    // ===================================
    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.feature-card__icon'), {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.feature-card__icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ===================================
    // SCROLL PROGRESS INDICATOR (OPTIONAL)
    // ===================================
    
    gsap.to('body', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                console.log('Scroll Progress:', (self.progress * 100).toFixed(2) + '%');
            }
        }
    });

    console.log('TV Bingo GSAP Animations Initialized! 🎉');
});

// ===================================
// SMOOTH SCROLL TO SECTIONS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#0' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 100
                    },
                    ease: 'power3.inOut'
                });
            }
        }
    });
});