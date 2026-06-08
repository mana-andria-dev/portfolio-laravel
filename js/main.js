// Menu mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Animation smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animation au scroll pour les skill bars
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skills-container').forEach(section => {
    observer.observe(section);
});

// Année automatique dans le footer
const yearElement = document.querySelector('.footer p');
if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', new Date().getFullYear());
}

// Galerie FastFid
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const dotsContainer = document.getElementById('galleryDots');
    let currentIndex = 0;
    let autoInterval;
    
    // Créer les dots
    function createDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Aller à un slide spécifique
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        const newIndex = (index + slides.length) % slides.length;
        slides[newIndex].classList.add('active');
        currentIndex = newIndex;
        
        // Mettre à jour les dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        resetAutoPlay();
    }
    
    // Slide suivant
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Slide précédent
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Auto-play (toutes les 5 secondes)
    function startAutoPlay() {
        autoInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoInterval);
        startAutoPlay();
    }
    
    function stopAutoPlay() {
        clearInterval(autoInterval);
    }
    
    // Événements
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Pause auto-play au hover
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoPlay);
        galleryContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialisation
    createDots();
    startAutoPlay();
});