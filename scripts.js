document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    const loader = document.querySelector('.loader');
    const loaderPercent = document.getElementById('loaderPercent');
    
    let percent = 0;
    const loaderInterval = setInterval(() => {
        percent += 1;
        loaderPercent.textContent = `${percent}%`;
        
        if (percent >= 100) {
            clearInterval(loaderInterval);
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 30);
    
    // Animate progress bar in terminal
    const progressBar = document.querySelector('.progress-bar');
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 500);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .portfolio-item, .stats, .form-group').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Simulate form submission
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Envoi en cours...';
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message envoyé!';
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.classList.remove('success');
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
    
    // Terminal typing effect
    const terminalLines = [
        "$ npm init lowcost-site",
        "✔ Spécialité? · avocat",
        "✔ Couleurs préférées? · bleu, blanc",
        "✔ Fonctionnalités? · rdv, blog, galerie",
        "Compiling site...",
        "Site généré avec succès!",
        "$ "
    ];
    
    const terminalBody = document.querySelector('.terminal-body');
    let currentLine = 0;
    let currentChar = 0;
    let typingInterval;
    
    function typeTerminal() {
        if (currentLine < terminalLines.length) {
            if (currentChar === 0) {
                // Create new line element
                const lineElement = document.createElement('div');
                lineElement.className = 'terminal-line';
                terminalBody.insertBefore(lineElement, terminalBody.lastElementChild);
            }
            
            const currentLineElement = terminalBody.children[currentLine];
            
            if (currentChar < terminalLines[currentLine].length) {
                currentLineElement.textContent += terminalLines[currentLine].charAt(currentChar);
                currentChar++;
            } else {
                currentLine++;
                currentChar = 0;
            }
        } else {
            clearInterval(typingInterval);
            // Show cursor
            terminalBody.lastElementChild.innerHTML = '$ <span class="terminal-cursor">|</span>';
        }
    }
    
    // Start typing after loader finishes
    setTimeout(() => {
        terminalBody.innerHTML = ''; // Clear placeholder content
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line';
        terminalBody.appendChild(cursorLine);
        
        typingInterval = setInterval(typeTerminal, 50);
    }, 3500);
});