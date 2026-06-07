/* ========================================
   Babu Gunda Sweet Wala - JavaScript
   ======================================== */

// ========================================
// DOM Elements
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.querySelector('nav');
const fadeElements = document.querySelectorAll('.fade-in');
const forms = document.querySelectorAll('form');
const addToCartButtons = document.querySelectorAll('.btn-sweet');

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenuOnLinkClick() {
    if (mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }
}

// ========================================
// Scroll Animation (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80; // Height of fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Navbar Shadow on Scroll
// ========================================
function handleNavbarScroll() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.add('bg-white/98');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.remove('bg-white/98');
        }
    }
}

// ========================================
// Form Submission Handler
// ========================================
function initFormHandlers() {
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message
            showNotification(
                '🍬 Dhanyavaad! Thank you for your order request. Babu Gunda ji will call you soon to confirm your order! 🍬',
                'success'
            );
            
            // Reset form
            form.reset();
            
            // Log form data (for debugging)
            console.log('Form submitted:', formObject);
        });
    });
}

// ========================================
// Add to Cart Button Handler
// ========================================
function initAddToCartButtons() {
    addToCartButtons.forEach(btn => {
        // Check if this is an "Add to Cart" button (contains cart-plus icon)
        if (btn.innerHTML && btn.innerHTML.includes('cart-plus')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get sweet name from the card
                const card = btn.closest('.card-hover');
                const sweetName = card ? card.querySelector('h3')?.textContent : 'Sweet';
                
                // Show confirmation
                showNotification(
                    `${sweetName} added to your order! Call us to complete your order. 🍬`,
                    'info'
                );
            });
        }
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        textAlign: 'center'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ========================================
// Active Navigation Link Highlighter
// ========================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-pink-600');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-pink-600');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
function initParallaxEffect() {
    const heroSection = document.querySelector('#home');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const decorativeElements = heroSection.querySelectorAll('.absolute');
            
            decorativeElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ========================================
// Lazy Loading for Images
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Style the button
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: '99',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        fontSize: '1.25rem'
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    });
}

// ========================================
// Preloader (Optional)
// ========================================
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
}

// ========================================
// Initialize All Functions
// ========================================
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeAll();
        });
    } else {
        initializeAll();
    }
}

function initializeAll() {
    // Hide preloader if exists
    hidePreloader();
    
    // Initialize all features
    toggleMobileMenu();
    closeMobileMenuOnLinkClick();
    initScrollAnimations();
    initSmoothScroll();
    initFormHandlers();
    initAddToCartButtons();
    initActiveNavLink();
    initBackToTop();
    
    // Optional features (uncomment if needed)
    // initParallaxEffect();
    // initLazyLoading();
    // initCounterAnimations();
}

// ========================================
// Event Listeners
// ========================================
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('scroll', handleNavbarScroll);

// Initialize on page load
init();

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🍬 Welcome to Babu Gunda Sweet Wala! 🍬', 
    'font-size: 20px; font-weight: bold; color: #f5576c;');
console.log('%cPure Desi Taste Since 1995', 
    'font-size: 14px; color: #f093fb;');
console.log('%cMade with ❤️ and lots of 🍬', 
    'font-size: 12px; color: #ff6a00;');

/* ========================================
   End of JavaScript
   ======================================== */
