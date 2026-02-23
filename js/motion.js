/**
 * RideGram - Motion Engine 2.0
 * Advanced physics-based animations and micro-interactions.
 */

class MotionEngine {
    static init() {
        console.log('✨ MotionEngine Initializing...');
        this.initTilt();
        this.initMeshGradients();
        this.initSpringTransitions();
    }

    /**
     * 3D Tilt Effect
     * High-performance parallax effect for cards based on cursor position.
     */
    static initTilt() {
        const cards = document.querySelectorAll('.post-card, .ride-card, .profile-header-content, .hero-content');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20; // Sensitivity 
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Spring back
            });
        });
    }

    /**
     * Dynamic Mesh Gradient
     * Sets up the "liquid" background system.
     */
    static initMeshGradients() {
        const bg = document.createElement('div');
        bg.className = 'mesh-gradient-bg';
        document.body.prepend(bg);

        // Dynamic color shifting could be added here for a more "alive" feel
    }

    /**
     * Spring Physics for transitions
     * Injects custom properties for spring-like movement.
     */
    static initSpringTransitions() {
        document.documentElement.style.setProperty('--spring-ease', 'cubic-bezier(0.34, 1.56, 0.64, 1)');
    }
}

document.addEventListener('DOMContentLoaded', () => MotionEngine.init());
