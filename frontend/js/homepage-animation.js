/**
 * Homepage Special: Simple Rotating Dish
 * Project: Royal Flave Premium Catering
 */

window.initHomepageAnimations = () => {
    const dishContainer = document.querySelector('.exploding-dish-container');
    if (!dishContainer) return;

    const fullDish = document.querySelector('.dish-full');
    const pot = document.querySelector('.dish-pot');

    // Reset styles for permanent visibility
    gsap.set(fullDish, { 
        opacity: 1, 
        scale: 1,
        pointerEvents: 'none'
    });
    
    gsap.set(pot, {
        opacity: 1,
        scale: 1
    });

    // State Variables
    let masterDeg = 0;

    // 1. Main Animation Loop (Sync Ticker)
    // Continuous rotation without scroll dependency
    gsap.ticker.add((time, deltaTime) => {
        const dt = deltaTime / 1000;
        
        // Steady rotation speed
        const baseSpeed = 15; // Degrees per second
        masterDeg += baseSpeed * dt;

        // Apply rotation to both layers
        gsap.set([pot, fullDish], { rotation: masterDeg });
    });

    // 2. Localized Hero Mouse Parallax (Return to original behavior)
    const floatingWrapper = document.querySelector('.banner-img');
    if (window.innerWidth > 1024) {
        dishContainer.addEventListener('mousemove', (e) => {
            const rect = dishContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(dishContainer, {
                x: x * 30,
                y: y * 30,
                rotateY: x * 15,
                rotateX: -y * 15,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
        
        dishContainer.addEventListener('mouseleave', () => {
            gsap.to(dishContainer, {
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    }
    
    console.log('✨ Simple Rotating Dish Animation Initialized');
};
