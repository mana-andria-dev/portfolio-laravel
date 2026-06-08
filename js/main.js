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

// ========== MODAL ZOOM POUR LA GALERIE ==========
(function() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
    
    function initModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.modal-close');
        
        // Si le modal n'existe pas, on ne fait rien
        if (!modal) return;
        
        // Récupérer toutes les images de la galerie
        const galleryImages = document.querySelectorAll('.gallery-img');
        
        // Stocker les descriptions des slides
        const slideDescriptions = [];
        document.querySelectorAll('.gallery-slide').forEach(slide => {
            const caption = slide.querySelector('.slide-caption');
            if (caption) {
                const h4 = caption.querySelector('h4');
                const p = caption.querySelector('p');
                slideDescriptions.push({
                    title: h4 ? h4.innerHTML : '',
                    desc: p ? p.innerHTML : ''
                });
            }
        });
        
        // Ajouter l'événement de clic sur chaque image
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                const imgSrc = this.getAttribute('src');
                modalImg.setAttribute('src', imgSrc);
                
                // Afficher la description correspondante
                if (slideDescriptions[index]) {
                    modalCaption.innerHTML = `${slideDescriptions[index].title}<br><span style="font-size:0.85rem; color:#cbd5e1;">${slideDescriptions[index].desc}</span>`;
                } else {
                    modalCaption.innerHTML = this.getAttribute('alt') || 'Capture d\'écran';
                }
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Empêcher le scroll
            });
        });
        
        // Fermer le modal au clic sur la croix
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        // Fermer le modal au clic en dehors de l'image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Fermer avec la touche Echap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
})();