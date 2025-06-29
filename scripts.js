document.addEventListener('DOMContentLoaded', function() {
    // Loader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        setTimeout(function() {
            loader.classList.add('loader-hidden');
            loader.addEventListener('transitionend', function() {
                document.body.removeChild(loader);
            });
        }, 1500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navbarLinks = document.querySelector('.navbar-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
        });
    });

    // Sticky Navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Typed Text Animation
    const typed = new Typed('.typed-text', {
        strings: ['médecins', 'avocats', 'architectes', 'notaires', 'professionnels libéraux'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Portfolio Data
    const portfolioData = [
        {
            id: 1,
            title: "Cabinet Médical Dr. Martin",
            category: "medecin",
            image: "images/Criar-Site-Hospital-Joomla-Responsivo-243.jpg",
            description: "Site vitrine pour un cabinet médical spécialisé en dermatologie. Le site comprend une présentation du docteur, ses spécialités, les horaires de consultation et un formulaire de contact.",
            features: [
                "Design responsive et moderne",
                "Présentation des services",
                "Formulaire de contact sécurisé",
                "Optimisation SEO",
                "Intégration des réseaux sociaux"
            ],
            link: "#"
        },
        {
            id: 2,
            title: "Maître Dupont - Avocat",
            category: "avocat",
            image: "images/Porto-notary-website-template.jpg",
            description: "Site professionnel pour un avocat spécialisé en droit des affaires. Le site met en valeur son expertise, ses domaines de compétence et permet aux clients de prendre rendez-vous en ligne.",
            features: [
                "Système de prise de rendez-vous",
                "Blog juridique",
                "Zone client sécurisée",
                "Certificat SSL",
                "Optimisation pour les mobiles"
            ],
            link: "#"
        },
        {
            id: 3,
            title: "Atelier d'Architecture Blanc",
            category: "architecte",
            image: "images/OIP.jpeg",
            description: "Portfolio en ligne pour un cabinet d'architecture présentant leurs projets récents, leur philosophie de travail et leurs services.",
            features: [
                "Galerie de projets",
                "Formulaire de demande de devis",
                "Animation des images",
                "Design minimaliste",
                "Chargement rapide"
            ],
            link: "#"
        },
        {
            id: 4,
            title: "Notaire Lefèvre",
            category: "notaire",
            image: "images/R.png",
            description: "Site institutionnel pour un office notarial présentant les services notariaux, l'équipe et les informations pratiques pour les clients.",
            features: [
                "Présentation de l'équipe",
                "FAQ interactive",
                "Calculatrice de frais notariaux",
                "Plan d'accès interactif",
                "Mises à jour faciles"
            ],
            link: "#"
        },
        {
            id: 5,
            title: "Clinique Dentaire Smile",
            category: "medecin",
            image: "images/dantair.jpeg",
            description: "Site web pour une clinique dentaire avec prise de rendez-vous en ligne, présentation des soins et de l'équipe médicale.",
            features: [
                "Calendrier de rendez-vous",
                "Galerie avant/après",
                "Témoignages de patients",
                "Chat en direct",
                "Multilingue"
            ],
            link: "#"
        },
        {
            id: 6,
            title: "Cabinet Juridique Associés",
            category: "avocat",
            image: "images/1f832cb4564fd9de47a5dc24fcec65a1.png",
            description: "Site web pour un cabinet d'avocats associés présentant leurs domaines d'expertise, leurs réussites et permettant aux clients potentiels de les contacter facilement.",
            features: [
                "Présentation des associés",
                "Liste des domaines d'expertise",
                "Formulaire de contact avancé",
                "Blog juridique",
                "Sécurité renforcée"
            ],
            link: "#"
        }
    ];

    // Portfolio Variables
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let portfolioItems = [];

    // Generate Portfolio Items
    function generatePortfolioItems() {
        portfolioGrid.innerHTML = '';
        
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    <a href="#" class="view-btn" data-id="${item.id}">Voir les détails</a>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });

        // Update portfolio items reference
        portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Add initial animation to items
        portfolioItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Trigger animation
        setTimeout(() => {
            portfolioItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    // Setup Filter Buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Initialize Portfolio
    function initPortfolio() {
        generatePortfolioItems();
        setupFilterButtons();
    }

    // Portfolio Modal
    const portfolioModal = document.querySelector('.portfolio-modal');
    const modalClose = document.querySelector('.close-modal');
    const modalContent = document.querySelector('.modal-body');

    // Open modal when clicking on view button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-btn')) {
            e.preventDefault();
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = portfolioData.find(i => i.id === itemId);
            
            if (item) {
                modalContent.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="modal-img">
                    <h3 class="modal-title">${item.title}</h3>
                    <p class="modal-subtitle">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    <p class="modal-description">${item.description}</p>
                    
                    <div class="modal-features">
                        <h4>Fonctionnalités</h4>
                        <ul>
                            ${item.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <a href="${item.link}" target="_blank" class="modal-link">Visiter le site</a>
                `;
                
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Back to Top Button
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Merci ${name} pour votre message! Nous vous contacterons bientôt à propos de votre demande pour ${service}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c63ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c63ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize everything
    initPortfolio();
    animateOnScroll(); // Run once on page load
});