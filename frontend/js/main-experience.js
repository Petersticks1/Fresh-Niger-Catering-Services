/**
 * Experience Orchestrator (Robust Global Version)
 */

(function() {
    console.log('🚀 Premium Experience Script Initialized');

    const checkDependencies = () => {
        const deps = {
            'GSAP': typeof gsap !== 'undefined',
            'ScrollTrigger': typeof ScrollTrigger !== 'undefined',
            'Three.js': typeof THREE !== 'undefined',
            'Lenis': typeof Lenis !== 'undefined'
        };
        
        console.table(deps);
        return !Object.values(deps).includes(false);
    };

    const runExperience = () => {
        if (!checkDependencies()) {
            console.error('❌ Missing dependencies. Animations will not run.');
            // Fallback: Reveal all elements so they aren't invisible
            document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        console.log('✅ All dependencies found. Building immersive layers...');

        // 1. Initialize Three.js Hero
        const heroContainer = document.getElementById('hero-canvas-container');
        let hero = null;
        if (heroContainer && typeof HeroScene !== 'undefined') {
            hero = new HeroScene('hero-canvas-container');
            console.log('✨ 3D Hero Scene Created');
        }

        // 2. Preloader Exit
        const preloader = document.querySelector('.cat-preloader');
        if (preloader) {
            const tl = gsap.timeline();
            tl.to('.cat-preloader-inner', { opacity: 0, y: -20, duration: 0.5 })
              .to('.cat-preloader', { 
                  clipPath: 'circle(0% at 50% 50%)', 
                  duration: 1.2, 
                  ease: 'expo.inOut' 
              })
              .set('.cat-preloader', { display: 'none' })
              .from('.cat-banner-text h4, .cat-banner-title, .cat-banner-text p, .cat-banner-btn-wrap', { 
                  opacity: 0, 
                  y: 30, 
                  duration: 1, 
                  stagger: 0.15,
                  ease: 'power3.out',
                  clearProps: "opacity,transform"
              }, '-=0.4')
              .add(() => {
                  if (typeof initHomepageAnimations === 'function') {
                      initHomepageAnimations();
                  }
              }, '-=0.8'); // Start assembly while title is still sliding up
        } else {
            // No preloader, run immediately
            if (typeof initHomepageAnimations === 'function') {
                initHomepageAnimations();
            }
        }

        // 3. Initialize GSAP Reveal Animations
        if (typeof initAnimations === 'function') {
            initAnimations();
            console.log('🎬 Scroll Animations Initialized');
        }

        // 4. Initialize Scroll Effects & Smooth Scroll
        if (typeof initScrollEffects === 'function') {
            initScrollEffects(hero);
            console.log('📜 Smooth Scrolling Active');
        }

        // 5. Initialize Micro-interactions
        if (typeof initInteractions === 'function') {
            initInteractions();
            console.log('🖱️ Micro-interactions Enabled');
        }
    };

    // Run as soon as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runExperience);
    } else {
        runExperience();
    }
})();
