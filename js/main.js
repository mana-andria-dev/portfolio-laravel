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
        if (navToggle) navToggle.classList.remove('active');
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

// ========== MODAL ZOOM (prêt à l'emploi pour plus tard) ==========
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
        
        // Récupérer toutes les images avec la classe 'gallery-img' ou 'clickable-img'
        const zoomImages = document.querySelectorAll('.gallery-img, .clickable-img');
        
        // Ajouter l'événement de clic sur chaque image
        zoomImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                const imgSrc = this.getAttribute('src');
                modalImg.setAttribute('src', imgSrc);
                
                // Description alternative
                const altText = this.getAttribute('alt') || 'Image du projet';
                modalCaption.innerHTML = altText;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
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

// Animation au scroll pour les cartes (services, compétences, expériences)
const fadeElements = document.querySelectorAll('.service-card, .skill-category, .timeline-row, .formation-card, .contact-card, .project-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(el);
});

// Gestion du header / navbar au scroll (optionnel : ajoute une classe pour l'ombre)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});