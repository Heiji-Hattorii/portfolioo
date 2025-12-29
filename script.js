// Animation et interactions avancées pour le portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tech items hover effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Pause l'animation d'orbite au hover
            this.style.animationPlayState = 'paused';
            
            // Ajoute un effet de glow
            const icon = this.querySelector('.tech-icon');
            icon.style.boxShadow = `
                0 0 30px rgba(255, 255, 255, 0.5),
                0 12px 35px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
            `;
        });

        item.addEventListener('mouseleave', function() {
            // Reprend l'animation
            this.style.animationPlayState = 'running';
            
            // Retire l'effet de glow
            const icon = this.querySelector('.tech-icon');
            icon.style.boxShadow = `
                0 8px 25px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `;
        });
    });

    // Animation d'apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    // Effet de typing pour le titre
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect pour les particules
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animation des skill tags au hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Form submission avec animation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Animation de chargement
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            submitBtn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }

    // Effet de cursor personnalisé pour les tech items
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(240, 147, 251, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            cursor.style.transform = 'scale(2)';
        });

        item.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            cursor.style.transform = 'scale(1)';
        });
    });
});

// Fonction pour créer des particules dynamiques
function createDynamicParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: fade-out 3s ease-out forwards;
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }, 2000);
}

// Ajouter les styles pour les particules dynamiques
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes fade-out {
        0% {
            opacity: 0;
            transform: translateY(0px) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(dynamicStyles);

// Initialiser les particules dynamiques
setTimeout(createDynamicParticles, 2000);