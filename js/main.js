// Main JavaScript - Interactive Elements & Smooth Animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        disable: false
    });

    // Mobile Navigation
    initMobileNavigation();

    // Cycle Tabs
    initCycleTabs();

    // Artifact Cards Interaction
    initArtifactCards();

    // Smooth Scroll for Navigation Links
    initSmoothScroll();

    // Add interactive glow effect to elements on mouse move
    initMouseGlowEffect();

    // Navbar sticky behavior
    initNavbarBehavior();
});

// ===========================
// MOBILE NAVIGATION
// ===========================

function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===========================
// CYCLE TABS FUNCTIONALITY
// ===========================

function initCycleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cyclePanels = document.querySelectorAll('.cycle-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cycle = button.getAttribute('data-cycle');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            cyclePanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.querySelector(`[data-cycle="${cycle}"]`).classList.add('active');
        });
    });

    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
    if (cyclePanels.length > 0) {
        cyclePanels[0].classList.add('active');
    }
}

// ===========================
// ARTIFACT CARDS INTERACTION
// ===========================

function initArtifactCards() {
    const artifactCards = document.querySelectorAll('.artifact-card');

    artifactCards.forEach(card => {
        const button = card.querySelector('.btn-artifact');

        button.addEventListener('click', (e) => {
            e.preventDefault();
            const artifact = card.getAttribute('data-artifact');
            showArtifactModal(artifact);
        });

        // Add hover glow effect
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 60px rgba(0, 212, 255, 0.7), inset 0 0 30px rgba(0, 212, 255, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

function showArtifactModal(artifactType) {
    const artifactData = {
        rpp: {
            title: 'Rencana Pelaksanaan Pembelajaran (RPP)',
            content: 'RPP yang telah dikembangkan menggunakan pendekatan konstruktivisme dengan fokus pada pembelajaran berpusat siswa. Setiap RPP dirancang dengan komponen lengkap termasuk tujuan pembelajaran, strategi diferensiasi, media interaktif, dan penilaian autentik.',
            highlight: 'Inovasi: Integrasi teknologi digital dan pembelajaran kolaboratif'
        },
        media: {
            title: 'Media Pembelajaran',
            content: 'Media pembelajaran dirancang untuk meningkatkan keterlibatan siswa melalui visualisasi yang menarik dan interaktif. Menggunakan kombinasi media visual, audio-visual, dan manipulatif konkret sesuai karakteristik materi dan siswa.',
            highlight: 'Inovasi: Media interaktif berbasis gamifikasi dan AR'
        },
        video: {
            title: 'Dokumentasi Video Pembelajaran',
            content: 'Video pembelajaran merekam proses pembelajaran autentik di kelas. Dokumentasi mencakup strategi pengajaran, interaksi siswa-guru, pengelolaan kelas, dan refleksi pembelajaran untuk continuous improvement.',
            highlight: 'Inovasi: Analisis video untuk self-reflection dan peer learning'
        },
        siswa: {
            title: 'Hasil Kerja Siswa',
            content: 'Koleksi hasil kerja siswa menunjukkan pencapaian pembelajaran dan perkembangan kompetensi. Termasuk produk akhir, portofolio proses, dan bukti peningkatan kemampuan dari awal hingga akhir pembelajaran.',
            highlight: 'Inovasi: Sistem portofolio digital dengan rubrik terukur'
        }
    };

    const data = artifactData[artifactType];
    if (!data) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'artifact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${data.title}</h2>
            <p>${data.content}</p>
            <div class="modal-highlight">
                <strong>✨ ${data.highlight}</strong>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Close button
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.parentElement) {
            modal.remove();
        }
    });
}

// ===========================
// SMOOTH SCROLL FOR NAVIGATION
// ===========================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===========================
// MOUSE GLOW EFFECT
// ===========================

function initMouseGlowEffect() {
    const interactiveElements = document.querySelectorAll(
        '.constellation-card, .glass-card, .artifact-card, .roadmap-pillar, .score-box, .assessment-card, .story-card'
    );

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
            );

            const maxDistance = 300;
            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                const glow = intensity * 30;

                element.style.boxShadow = `0 0 ${glow}px rgba(0, 212, 255, ${intensity * 0.4})`;
            }
        });
    });
}

// ===========================
// NAVBAR STICKY BEHAVIOR
// ===========================

function initNavbarBehavior() {
    const navbar = document.getElementById('navbar');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollPosition && currentScroll > 100) {
            // Scrolling down
            navbar.style.boxShadow = 'none';
        } else {
            // Scrolling up
            navbar.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.2)';
        }

        lastScrollPosition = currentScroll;
    });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(
                `.nav-link[href="#${section.id}"]`
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Intersection Observer for additional scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ===========================
// MODAL STYLES (added dynamically)
// ===========================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .artifact-modal {
        display: none !important;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(11, 11, 30, 0.9);
        backdrop-filter: blur(5px);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal-content {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border: 2px solid #00d4ff;
        border-radius: 20px;
        padding: 3rem;
        max-width: 600px;
        backdrop-filter: blur(20px);
        position: relative;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.3);
        animation: slideUp 0.4s ease;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        transform: rotate(90deg) scale(1.2);
        text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
    }

    .modal-content h2 {
        color: #00d4ff;
        font-family: 'Orbitron', sans-serif;
        margin-bottom: 1.5rem;
        letter-spacing: 1px;
    }

    .modal-content p {
        color: #a0a0c0;
        line-height: 1.8;
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    .modal-highlight {
        background: rgba(0, 212, 255, 0.1);
        border-left: 4px solid #d946ef;
        padding: 1.5rem;
        border-radius: 10px;
        color: #10b981;
    }

    @media (max-width: 600px) {
        .modal-content {
            margin: 2rem;
            padding: 2rem;
        }

        .modal-content h2 {
            font-size: 1.5rem;
        }

        .modal-content p {
            font-size: 0.95rem;
        }
    }
`;
document.head.appendChild(styleSheet);
