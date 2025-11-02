        // ═══════════════════════════════════════════════════════════════
        // TYPING EFFECT FOR HERO SECTION
        // EDIT: Change typing text in the array below
        // ═══════════════════════════════════════════════════════════════
        const typingElement = document.getElementById('typingText');
        const typingTexts = [
            'Ethical Hacker',
            'Security Researcher',
            'CTF Player',
            'Bug Hunter',
            'Penetration Tester'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1) + '_';
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1) + '_';
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of text
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(typeText, 1000);
        
        // ═══════════════════════════════════════════════════════════════
        // SCROLL REVEAL ANIMATION USING INTERSECTION OBSERVER
        // ═══════════════════════════════════════════════════════════════
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
        
        // ═══════════════════════════════════════════════════════════════
        // PARALLAX EFFECT FOR HERO SECTION
        // ═══════════════════════════════════════════════════════════════
        const heroSection = document.getElementById('home');
        const gridBg = document.querySelector('.grid-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            // Only apply parallax in hero section
            if (scrolled < heroHeight) {
                if (gridBg) {
                    gridBg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            }
        });
        
        // ═══════════════════════════════════════════════════════════════
        // SMOOTH SCROLL FOR NAVIGATION LINKS
        // ═══════════════════════════════════════════════════════════════
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
        
        // ═══════════════════════════════════════════════════════════════
        // KEYBOARD NAVIGATION ENHANCEMENT
        // ═══════════════════════════════════════════════════════════════
        const focusableElements = document.querySelectorAll(
            'a, button, .skill-item, .achievement-item, .project-card'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
                    element.click();
                }
            });
        });
        
        // ═══════════════════════════════════════════════════════════════
        // CONSOLE EASTER EGG
        // ═══════════════════════════════════════════════════════════════
        console.log('%c🔐 N3ON_GHOST SECURITY PORTFOLIO', 'color: #00ffff; font-size: 20px; font-weight: bold;');
        console.log('%cLooking for easter eggs? You found one! 🎯', 'color: #00ff41; font-size: 14px;');
        console.log('%cInterested in collaboration? Reach out via the contact section.', 'color: #a0a0a0; font-size: 12px;');
        console.log('%cFlag{th3_c0ns0l3_1s_y0ur_fr13nd}', 'color: #ff006e; font-size: 12px; font-family: monospace;');
        
        // ═══════════════════════════════════════════════════════════════
        // PERFORMANCE: LAZY LOAD ANIMATIONS
        // Only animate elements that are visible
        // ═══════════════════════════════════════════════════════════════
        if ('IntersectionObserver' in window) {
            const lazyAnimations = document.querySelectorAll('.project-card, .achievement-item');
            
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            lazyAnimations.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                animationObserver.observe(element);
            });
        }
        
        // ═══════════════════════════════════════════════════════════════
        // ACTIVE NAVIGATION INDICATOR
        // ═══════════════════════════════════════════════════════════════
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
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
                link.style.color = '';
                link.style.borderColor = '';
                
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--neon-cyan)';
                    link.style.borderColor = 'var(--neon-cyan)';
                }
            });
        });
        
        // ═══════════════════════════════════════════════════════════════
        // INITIALIZE ON PAGE LOAD
        // ═══════════════════════════════════════════════════════════════
        window.addEventListener('load', () => {
            // Add loaded class to body for any initial animations
            document.body.classList.add('loaded');
            
            // Force check for visible reveal elements on load
            revealElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    element.classList.add('active');
                }
            });
        });

// ═══════════════════════════════════════════════════════════════
// SKILL DISCS ANIMATION
// ═══════════════════════════════════════════════════════════════
const discItems = document.querySelectorAll('.disc-item');
        
        const discObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        animateDisc(entry.target);
                    }, index * 200);
                    discObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        function animateDisc(item) {
            const percentage = parseInt(item.dataset.percentage);
            const progressCircle = item.querySelector('.disc-circle-progress');
            const percentageValue = item.querySelector('.disc-percentage-value');
            
            const radius = 80;
            const circumference = 2 * Math.PI * radius;
            
            let currentPercentage = 0;
            const duration = 2000;
            const increment = percentage / (duration / 16);
            
            const timer = setInterval(() => {
                currentPercentage += increment;
                
                if (currentPercentage >= percentage) {
                    currentPercentage = percentage;
                    clearInterval(timer);
                }
                
                const offset = circumference - (currentPercentage / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
                percentageValue.textContent = Math.floor(currentPercentage);
            }, 16);
        }

        discItems.forEach(item => {
            discObserver.observe(item);
        });

        // ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════════
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

