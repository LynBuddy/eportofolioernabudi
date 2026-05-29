// Starfield Canvas Animation
// Creates millions of twinkling stars with parallax effect

class Starfield {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.stars = [];
        this.scrollPosition = 0;
        this.time = 0;

        this.init();
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.handleScroll());
    }

    init() {
        // Create stars with varying depths for parallax effect
        const starCount = Math.floor((this.width * this.height) / 5000);
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.3,
                depth: Math.random(), // 0 = far, 1 = near
                twinkleDuration: Math.random() * 3 + 2,
                twinklePhase: Math.random() * Math.PI * 2,
                color: this.getRandomStarColor(),
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            });
        }
        this.animate();
    }

    getRandomStarColor() {
        const colors = [
            '#ffffff',      // White
            '#00d4ff',      // Cyan
            '#d946ef',      // Purple
            '#ec4899',      // Pink
            '#fbbf24',      // Amber
            '#34d399',      // Green
            '#a78bfa'       // Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    handleScroll() {
        this.scrollPosition = window.scrollY;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.time += 0.016; // ~60fps

        this.stars.forEach(star => {
            // Parallax effect based on scroll position
            const parallaxY = star.y + (this.scrollPosition * (1 - star.depth) * 0.5);

            // Keep stars visible within viewport with wraparound
            let displayY = parallaxY;
            if (displayY < -50) displayY += this.height + 100;
            if (displayY > this.height + 50) displayY -= this.height + 100;

            // Twinkling effect
            const twinkleValue = Math.sin(this.time / star.twinkleDuration * Math.PI * 2 + star.twinklePhase) * 0.5 + 0.5;
            const alpha = star.opacity * (0.3 + twinkleValue * 0.7);

            // Subtle movement
            star.x += star.vx * 0.01;
            star.y += star.vy * 0.01;

            // Wrap around screen
            if (star.x < 0) star.x = this.width;
            if (star.x > this.width) star.x = 0;
            if (star.y < -50) star.y = this.height + 50;
            if (star.y > this.height + 50) star.y = -50;

            // Draw star with glow
            this.ctx.fillStyle = star.color;
            this.ctx.globalAlpha = alpha;
            this.ctx.beginPath();
            this.ctx.arc(star.x, displayY, star.radius * (0.8 + twinkleValue * 0.4), 0, Math.PI * 2);
            this.ctx.fill();

            // Add glow effect
            this.ctx.strokeStyle = star.color;
            this.ctx.lineWidth = star.radius * 0.5;
            this.ctx.globalAlpha = alpha * 0.3;
            this.ctx.stroke();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize starfield when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (canvas) {
        new Starfield(canvas);
    }
});
