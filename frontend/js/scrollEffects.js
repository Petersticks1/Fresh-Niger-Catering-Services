/**
 * Scroll-based Effects (Non-Module Version)
 */

window.initScrollEffects = (heroScene) => {
  // 1. Smooth Scrolling (Lenis) - Using global Lenis from script tag
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync scrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Three.js Scrubbing Support
  if (heroScene) {
    ScrollTrigger.create({
      trigger: '.cat-banner-wrapper',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        heroScene.updateOnScroll(self.progress);
      }
    });
  }

  // 3. Header Background on Scroll
  const header = document.querySelector('header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -50',
      onEnter: () => header.classList.add('header-scrolled'),
      onLeaveBack: () => header.classList.remove('header-scrolled'),
    });
  }

  // 4. Progress Bar removed per user request
  
  return lenis;
};
