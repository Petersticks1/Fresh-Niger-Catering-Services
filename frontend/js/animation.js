/**
 * GSAP Animation System (Non-Module Version)
 */

window.initAnimations = () => {
    // Register ScrollTrigger if loaded via script
    gsap.registerPlugin(ScrollTrigger);

    // 1. Reveal Up
    const reveals = document.querySelectorAll('.reveal-up');
    reveals.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 2. Reveal Sides
    document.querySelectorAll('.reveal-left').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    document.querySelectorAll('.reveal-right').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    // 3. Staggered Sections
    const staggers = [
        { selector: '.cat-top-dish-section', stagger: 0.15 },
        { selector: '.cat-counter-section', stagger: 0.2 }
    ];

    staggers.forEach(({ selector, stagger }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0],
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: stagger,
                ease: 'power2.out'
            });
        }
    });

    // 4. Service Specific: Fading/Dimming Scrub + Shake Animation
    document.querySelectorAll('.cat-service-section').forEach((el) => {
        // a) Fade and Dim Scrubbing
        gsap.fromTo(el, 
            { opacity: 0.2, scale: 0.85, y: 30 },
            { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%',
                    end: 'top 60%',
                    scrub: 1.5,
                    toggleActions: 'play reverse play reverse'
                },
                ease: 'power2.out'
            }
        );

        // b) Shake twice when scrolled to
        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
                const shakeTl = gsap.timeline();
                shakeTl.to(el, { x: -8, duration: 0.1, ease: 'power1.inOut' })
                       .to(el, { x: 8, duration: 0.1, ease: 'power1.inOut' })
                       .to(el, { x: -8, duration: 0.1, ease: 'power1.inOut' })
                       .to(el, { x: 8, duration: 0.1, ease: 'power1.inOut' })
                       .to(el, { x: 0, duration: 0.1, ease: 'back.out(1.7)' });
            }
        });

        // c) Shake twice when hovered (focus)
        el.addEventListener('mouseenter', () => {
            gsap.timeline({ overwrite: 'auto' })
                   .to(el, { x: -6, duration: 0.1, repeat: 1, yoyo: true })
                   .to(el, { x: 6, duration: 0.1, repeat: 1, yoyo: true })
                   .to(el, { x: 0, duration: 0.1 });
        });
    });

    // 5. Counter Floating Animation (Alternating) - Faster
    const counters = document.querySelectorAll('.cat-counter-wrap [class*="col-"]');
    counters.forEach((el, i) => {
        gsap.to(el, {
            y: i % 2 === 0 ? -25 : 25,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15
        });
    });

    // 6. PowerPoint Inspired Custom Transitions
    
    // Zoom In 
    document.querySelectorAll('.reveal-zoom').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)'
        });
    });

    // Wipe Reveal (Subtle)
    document.querySelectorAll('.reveal-wipe-left').forEach((el) => {
        gsap.set(el, { clipPath: 'inset(0 100% 0 0)' });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power2.inOut'
        });
    });

    // Split Reveal (Exciting - Middle outwards)
    document.querySelectorAll('.reveal-split').forEach((el) => {
        gsap.set(el, { clipPath: 'inset(0 50% 0 50%)' });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'expo.out'
        });
    });

    // Pan (Dynamic - Moving with skew)
    document.querySelectorAll('.reveal-pan-right').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            skewX: -10,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out'
        });
    });

    // 7. Interactive Focus/Hover Pulse for all Reveal Elements
    document.querySelectorAll('[class*="reveal-"]').forEach((el) => {
        // Subtle Pulse on Hover
        el.addEventListener('mouseenter', () => {
            gsap.to(el, { 
                scale: 1.03, 
                duration: 0.3, 
                yoyo: true, 
                repeat: 1, 
                ease: 'power2.inOut',
                overwrite: 'auto' 
            });
        });

        // Wiggle/Rise on Keyboard Focus
        el.addEventListener('focusin', () => {
            gsap.to(el, { 
                y: -8, 
                duration: 0.2, 
                yoyo: true, 
                repeat: 1, 
                ease: 'back.out(2)' 
            });
        });
    });
};
