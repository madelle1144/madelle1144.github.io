document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Gallery functionality
    const galleryBtn = document.querySelector('.gallery-btn');
    const backBtn = document.querySelector('.back-btn');
    const gallerySection = document.getElementById('gallery');
    const mainSections = document.querySelectorAll('section:not(#gallery)');

    galleryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Hide all main sections
        mainSections.forEach(section => {
            section.style.display = 'none';
        });
        // Show gallery
        gallerySection.style.display = 'block';
        window.scrollTo(0, 0);
    });

    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Show all main sections
        mainSections.forEach(section => {
            section.style.display = 'block';
        });
        // Hide gallery
        gallerySection.style.display = 'none';
        // Scroll to home
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });

    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') !== '#gallery') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});
// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});
// Form submission handling
const form = document.querySelector('form');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.textContent = 'Oops! There was a problem sending your message.';
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = '#f8d7da';
        formMessage.style.color = '#721c24';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});