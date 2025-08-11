// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Hero Slider
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Auto slide functionality
function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Initialize slider if elements exist
if (document.querySelector('.slide')) {
    showSlides(slideIndex);
    startSlider();

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlider);
        heroSection.addEventListener('mouseleave', startSlider);
    }

    // Navigation buttons
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlider();
            nextSlide();
            startSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item-main');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, 100);
            } else {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
let currentModalIndex = 0;
let modalImages = [];

function openModal(button) {
    const galleryItem = button.closest('.gallery-item-main');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h4').textContent;
    const description = galleryItem.querySelector('p').textContent;
    
    // Get all visible gallery items for navigation
    modalImages = Array.from(document.querySelectorAll('.gallery-item-main')).filter(item => 
        getComputedStyle(item).display !== 'none'
    );
    
    currentModalIndex = modalImages.indexOf(galleryItem);
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;
        
        document.body.style.overflow = 'hidden';
    }
}

function closeModalFunction() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal navigation
function showModalImage(index) {
    if (modalImages[index]) {
        const img = modalImages[index].querySelector('img');
        const title = modalImages[index].querySelector('h4').textContent;
        const description = modalImages[index].querySelector('p').textContent;
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;
    }
}

// Modal event listeners
if (closeModal) {
    closeModal.addEventListener('click', closeModalFunction);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
}

// Modal navigation buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
        showModalImage(currentModalIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex + 1) % modalImages.length;
        showModalImage(currentModalIndex);
    });
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModalFunction();
        } else if (e.key === 'ArrowLeft') {
            currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
            showModalImage(currentModalIndex);
        } else if (e.key === 'ArrowRight') {
            currentModalIndex = (currentModalIndex + 1) % modalImages.length;
            showModalImage(currentModalIndex);
        }
    }
});

// FAQ Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'eventType', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                input.style.borderColor = '#D4AF37';
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = contactForm.querySelector('[name="email"]');
        if (!emailRegex.test(data.email)) {
            emailInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        const phoneInput = contactForm.querySelector('[name="phone"]');
        if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
            phoneInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#28a745';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #D4AF37, #F4D03F)';
                submitBtn.disabled = false;
                
                // Reset border colors
                contactForm.querySelectorAll('input, select, textarea').forEach(input => {
                    input.style.borderColor = '#e1e5e9';
                });
            }, 2000);
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .team-member, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Dynamic year in footer
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
}