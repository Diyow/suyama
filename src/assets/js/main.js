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
        // Mobile menu toggle
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

        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
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
