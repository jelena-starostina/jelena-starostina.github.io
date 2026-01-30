// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CTA BUTTON SCROLL =====
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// ===== TILT EFFECT FOR CARDS =====
class Tilt {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => this.onMouseEnter());
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseEnter() {
        this.element.style.transition = 'none';
    }

    onMouseLeave() {
        this.element.style.transition = 'all 0.3s ease';
        this.element.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 10;
        const rotateY = -(e.clientX - centerX) / 10;

        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// Инициализируем tilt для карточек
document.querySelectorAll('[data-tilt]').forEach(card => {
    new Tilt(card);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const x = (e.clientX / window.innerWidth) * 20 * (index + 1);
        const y = (e.clientY / window.innerHeight) * 20 * (index + 1);
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== INTERSECTION OBSERVER для анимации появления =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// ===== WAVE RIPPLE EFFECT =====
document.querySelector('.wave-button').addEventListener('click', function(e) {
    const waves = this.querySelectorAll('.wave');
    waves.forEach(wave => {
        wave.style.animation = 'none';
        setTimeout(() => {
            wave.style.animation = 'wave-animation 0.6s ease-out';
        }, 10);
    });
});

// ===== NAVBAR ACTIVE LINK =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== FLOATING ANIMATION ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.transform = `translateY(${scrollPercentage * 50}px)`;
    }
});

console.log('🎨 Креативный портфолио загружен!');
