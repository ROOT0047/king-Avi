document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Page Loader ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
        }, 500);
    });

    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('header');
    
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        document.querySelectorAll('a, button, .tag, .service-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 0';
            header.style.background = 'rgba(6, 9, 18, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(6, 9, 18, 0.8)';
            header.style.boxShadow = 'none';
        }
    };
    window.addEventListener('scroll', handleScroll);

    // --- 2. Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    // Inject mobile menu structure if missing or just handle toggle
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
            
            // Toggle body scroll
            if (navLinks.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- 3. Reveal Animations on Scroll ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.reveal, .service-card, .project-card, .timeline-item, .stat-item');
    revealElements.forEach(el => {
        // Add reveal class if not present
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- 4. Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Contact Form Simulation ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ph ph-circle-notch-bold"></i> Sending...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            formStatus.innerHTML = '<div class="success-msg"><i class="ph ph-check-circle"></i> Message sent! I\'ll get back to you soon.</div>';
            formStatus.style.marginTop = '1rem';
            formStatus.style.color = 'var(--primary)';
            
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Reset status after 5s
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }

    // --- 6. Parallax effect for Hero Image ---
    window.addEventListener('mousemove', (e) => {
        const heroContainer = document.querySelector('.hero-img-container');
        if (heroContainer) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
            heroContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // --- 7. Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 8. Card Tilt Effect ---
    const cards = document.querySelectorAll('.project-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // --- 9. Magnetic Button Effect ---
    const magneticBtns = document.querySelectorAll('.btn.primary, .nav-cta, .social-link');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });
});

// Add mobile-active styles via JS if not in CSS (safer for this conversion)
const mobileStyles = document.createElement('style');
mobileStyles.innerHTML = `
    @media (max-width: 992px) {
        #nav-links.mobile-active {
            display: flex !important;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--bg-dark);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 999;
            gap: 2rem;
            animation: fadeIn 0.3s ease;
        }
        #nav-links.mobile-active a {
            font-size: 1.5rem;
        }
        .menu-btn {
            display: flex !important;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            z-index: 1001;
        }
        .menu-btn span {
            display: block;
            width: 25px;
            height: 2px;
            background: #fff;
            transition: all 0.3s;
        }
        .menu-btn.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .menu-btn.active span:nth-child(2) { opacity: 0; }
        .menu-btn.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .success-msg {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(mobileStyles);
