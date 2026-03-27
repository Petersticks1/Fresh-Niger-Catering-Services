/**
 * Homepage Special: Exploding & Assembling Dish Animation
 * Project: Royal Flave Premium Catering
 */

window.initHomepageAnimations = () => {
    const dishContainer = document.querySelector('.exploding-dish-container');
    if (!dishContainer) return;

    const pieces = document.querySelectorAll('.food-piece');
    const fullDish = document.querySelector('.dish-full');
    const pot = document.querySelector('.dish-pot');

    // 0. Ensure pieces are absolute centered for correct orbital math on all screen sizes
    gsap.set(pieces, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0
    });

    // State Variables
    let scrollProgress = 0;
    let masterDeg = 0;

    // Responsive Radius calculation
    const getBaseRadius = () => {
        const width = window.innerWidth;
        const containerWidth = dishContainer.offsetWidth;
        
        if (width < 768) {
            // Mobile: Scale radius to fit phone screen tightly but visible
            return containerWidth * 0.42; 
        } else {
            // Desktop: Wider surround as requested
            return containerWidth * 0.75;
        }
    };

    let currentBaseRadius = getBaseRadius();
    window.addEventListener('resize', () => { currentBaseRadius = getBaseRadius(); });

    const pieceData = Array.from(pieces).map((piece, i) => {
        const angleOffset = (i / pieces.length) * Math.PI * 2;
        return {
            initialRotation: Math.random() * 360,
            rotationSpeed: (Math.random() * 0.3 + 0.1),
            floatPhase: Math.random() * Math.PI * 2,
            angleOffset: angleOffset
        };
    });

    gsap.set(fullDish, { opacity: 0, scale: 0.95 });

    // 1. Scroll-Trigger Progress Tracker
    ScrollTrigger.create({
        trigger: '.cat-banner-wrapper',
        start: 'top top',
        end: '+=180%',
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        onUpdate: (self) => {
            scrollProgress = self.progress;

            if (scrollProgress > 0.8) {
                const assemblyP = (scrollProgress - 0.8) / 0.2;
                gsap.set(fullDish, {
                    opacity: assemblyP,
                    scale: 0.95 + (assemblyP * 0.05)
                });
                gsap.set(pot, {
                    scale: 1 + (assemblyP * 0.1),
                    filter: `drop-shadow(0 ${20 + assemblyP * 20}px ${40 + assemblyP * 20}px rgba(0,0,0,0.4))`
                });
            } else {
                gsap.set(fullDish, { opacity: 0 });
                gsap.set(pot, { scale: 1 });
            }
        }
    });

    // 2. Main Animation Loop (Sync Ticker)
    gsap.ticker.add((time, deltaTime) => {
        const dt = deltaTime / 1000;
        const p = scrollProgress;

        const baseSpeed = 360 / 25; 
        const speedScale = 1 + p * 5;
        masterDeg += baseSpeed * dt * speedScale;

        gsap.set([pot, fullDish], { rotation: masterDeg });

        const masterRad = masterDeg * (Math.PI / 180);

        pieces.forEach((piece, i) => {
            const data = pieceData[i];
            const spiralStep = p * Math.PI * 3;
            const currentAngle = masterRad + data.angleOffset + spiralStep;

            // Use currentBaseRadius which responds to screen size
            const radius = currentBaseRadius * (1 - Math.pow(p, 1.2)) + (30 * p);

            const targetX = Math.cos(currentAngle) * radius;
            let targetY = Math.sin(currentAngle) * (radius * 0.35);

            targetY += Math.sin(time + data.floatPhase) * 10 * (1 - p);
            targetY += p * 40;

            const selfRot = data.initialRotation + (time * data.rotationSpeed * 30) + (p * 720);
            const fadeOut = p > 0.88 ? (1 - (p-0.88)*8) : 1;

            gsap.set(piece, {
                x: targetX,
                y: targetY,
                rotation: selfRot,
                scale: 1,
                opacity: p > 0.01 ? fadeOut : 1,
                display: p > 0.99 ? 'none' : 'block'
            });
        });
    });

    // 3. Mouse Parallax (Desktop Only)
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
                duration: 1,
                ease: 'power2.out'
            });
        });
    }
};
