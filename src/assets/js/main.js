// Component loading functions
async function Navbar() {
    const response = await fetch('../src/components/navbar.html');
    return await response.text();
}

async function HeroSection() {
    const response = await fetch('../src/components/hero.html');
    return await response.text();
}

async function AboutSection() {
    const response = await fetch('../src/components/about.html');
    return await response.text();
}

async function ServicesSection() {
    const response = await fetch('../src/components/services.html');
    return await response.text();
}

async function ContactSection() {
    const response = await fetch('../src/components/contact.html');
    return await response.text();
}

async function Footer() {
    const response = await fetch('../src/components/footer.html');
    return await response.text();
}

// Load all components
async function loadAllComponents() {
    try {
        const [navbar, hero, about, services, contact, footer] = await Promise.all([
            Navbar(),
            HeroSection(),
            AboutSection(),
            ServicesSection(),
            ContactSection(),
            Footer()
        ]);

        // Inject components into their respective containers
        document.getElementById('navbar').innerHTML = navbar;
        document.getElementById('hero').innerHTML = hero;
        document.getElementById('about').innerHTML = about;
        document.getElementById('services').innerHTML = services;
        document.getElementById('contact').innerHTML = contact;
        document.getElementById('footer').innerHTML = footer;
        
        console.log('All components loaded successfully!');
        
        // Initialize event handlers after components are loaded
        initializeEventHandlers();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize event handlers
function initializeEventHandlers() {
    // Mobile menu toggle functionality
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Enhanced mobile menu toggle with existing hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"], .footer-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Close new mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Update active navigation state
                updateActiveNavigation(targetId);
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simple form validation and submission (you can replace this with actual form handling)
            console.log('Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add scroll effect to navbar and active section detection
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update active navigation based on scroll position
        updateActiveNavigationOnScroll();
    });
    
    // Initialize intersection observer for better performance
    initializeIntersectionObserver();
}

// Update active navigation state
function updateActiveNavigation(targetHref) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetHref) {
            link.classList.add('active');
        }
    });
}

// Update active navigation based on scroll position
function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize intersection observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllComponents();
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    console.log('Page fully loaded in', performance.now(), 'ms');
});
