/**
 * Hero Content Rotator (Full Slide-In with Multi-CTA)
 */

class HeroRotator {
    constructor() {
        this.titleElement = document.getElementById('hero-title');
        this.descElement = document.getElementById('hero-desc');
        this.ctaElement = document.getElementById('hero-cta');
        
        this.contents = [
            {
                title: "Stop managing the kitchen and start enjoying the \"vibe.\"",
                desc: "We deliver impeccable taste and zero stress—pure excellence, no stories.",
                ctaText: "Save Me the Stress",
                ctaLink: "#bookNow"
            },
            {
                title: "Great Food. No Stress. Just Enjoy the Moment.",
                desc: "From daily meals to full event catering, we make sure your food shows up fresh, on time, and exactly how you expect it.",
                ctaText: "See Our Menu",
                ctaLink: "menu.html"
            },
            {
                title: "Ordering food can be frustrating, late, disappointing, or not what you expected.",
                desc: "We do things differently. Every meal is freshly prepared, clearly priced, and delivered exactly as promised. No surprises. No stories.",
                ctaText: "Order on WhatsApp",
                ctaLink: "https://wa.me/2347077195098?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20for%20catering%20services."
            }
        ];

        this.currentIndex = 0; 
        this.switchInterval = 5000; 
        
        this.init();
    }

    async init() {
        // 1. Initial State: Hidden and shifted left
        gsap.set([this.titleElement, this.descElement, this.ctaElement], { 
            opacity: 0, 
            x: -100 
        });

        // 2. Wait for preloader transition 
        await new Promise(r => setTimeout(r, 2200));
        
        // 3. First Slide-In
        this.animateIn();
        
        // 4. Start the loop
        await new Promise(r => setTimeout(r, this.switchInterval + 1000));
        this.currentIndex = 1; 
        this.startLoop();
    }

    async startLoop() {
        while (true) {
            const current = this.contents[this.currentIndex];
            
            // Sliding Animation Timeline
            const tl = gsap.timeline();
            
            // 1. Slide OUT to the right and fade
            tl.to([this.titleElement, this.descElement, this.ctaElement], { 
                opacity: 0, 
                x: 100, 
                duration: 0.8, 
                ease: 'power2.in',
                stagger: 0.1 
            })
            // 2. SWAP current values and reset to the LEFT
            .add(() => {
                this.titleElement.textContent = current.title;
                this.descElement.textContent = current.desc;
                this.ctaElement.textContent = current.ctaText;
                this.ctaElement.setAttribute('href', current.ctaLink);
                
                gsap.set([this.titleElement, this.descElement, this.ctaElement], { x: -100 });
            })
            // 3. Slide IN from the left and fade
            .add(() => {
                this.animateIn();
            });

            // Prepare for next cycle
            this.currentIndex = (this.currentIndex + 1) % this.contents.length;
            
            // Wait for next rotation
            await new Promise(r => setTimeout(r, this.switchInterval + 1800));
        }
    }

    animateIn() {
        gsap.to([this.titleElement, this.descElement, this.ctaElement], { 
            opacity: 1, 
            x: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            stagger: 0.15 
        });
    }
}

// Start once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroRotator();
});
