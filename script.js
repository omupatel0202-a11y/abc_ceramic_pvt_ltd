// ABC Ceramic - Festival Theme System + Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // 🎪 FESTIVAL THEME SWITCHER
    const themeSwitcher = document.getElementById('themeSwitcher');
    const body = document.body;
    
    // Theme configurations with animations
    const themes = {
        'default': {
            className: 'default-theme',
            bg: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            particles: false
        },
        'holi': {
            className: 'holi-theme',
            bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            particles: 'holi'
        },
        'diwali': {
            className: 'diwali-theme', 
            bg: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
            particles: 'diwali'
        },
        'navratri': {
            className: 'navratri-theme',
            bg: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 50%, #ffcc02 100%)',
            particles: 'navratri'
        },
        'christmas': {
            className: 'christmas-theme',
            bg: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #0f3460 100%)',
            particles: 'christmas'
        }
    };
    
    // Apply theme with smooth transition
    function applyTheme(themeKey) {
        const theme = themes[themeKey];
        
        // Remove all theme classes
        Object.values(themes).forEach(t => body.classList.remove(t.className));
        
        // Add new theme
        body.classList.add(theme.className);
        
        // Change body background
        document.body.style.background = theme.bg;
        
        // Start festival particles
        if (theme.particles) {
            startFestivalParticles(theme.particles);
        } else {
            stopParticles();
        }
        
        // Update navbar for dark themes
        updateNavbar(themeKey);
    }
    
    // Theme switcher event
    themeSwitcher.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Auto-detect festival (Demo)
    function autoDetectFestival() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        if (month === 3 && day >= 20) return 'holi';      // March Holi
        if (month === 10 && day >= 20) return 'diwali';    // October Diwali  
        if (month === 10 && day <= 10) return 'navratri';  // October Navratri
        if (month === 12 && day >= 20) return 'christmas'; // December Christmas
        
        return 'default';
    }
    
    // Initialize with auto theme
    const autoTheme = autoDetectFestival();
    themeSwitcher.value = autoTheme;
    applyTheme(autoTheme);
    
    // 🔥 FESTIVAL PARTICLE ANIMATIONS
    let particles = [];
    
    function createParticle(type) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${type}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(particle);
        return particle;
    }
    
    function startFestivalParticles(type) {
        stopParticles();
        
        // Create 20 particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                particles.push(createParticle(type));
            }, i * 200);
        }
    }
    
    function stopParticles() {
        particles.forEach(p => p.remove());
        particles = [];
    }
    
    // Navbar theme adaptation
    function updateNavbar(themeKey) {
        const header = document.querySelector('.header');
        if (themeKey === 'diwali') {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
        }
    }
    
    // 📱 MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 🖱️ SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ✨ SCROLL ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // 📝 CONTACT FORM
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Simulate send
            setTimeout(() => {
                alert('Thank you! Your message has been sent. 🎉');
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
    
    // 🎨 HOVER EFFECTS ENHANCEMENT
    document.querySelectorAll('.product-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.03)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});