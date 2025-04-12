/**
 * Main JavaScript file for Cycle Repair Pro website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('active');
        });
    }

    // Gallery Filtering
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length > 0 && galleryItems.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                // Add active class to current filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = this.classList.contains('active');
                
                // Close all other answers
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                });
                
                // Toggle current answer
                if (!isOpen) {
                    this.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.classList.add('error');
                    valid = false;
                }
            }
            
            if (valid) {
                // In a real implementation, you would send the form data to the server here
                // For this demo, we'll just show a success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset the form after a delay
                setTimeout(() => {
                    contactForm.reset();
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Language Switching Functionality
    initializeLanguageSwitcher();
});

// Function to initialize language switching
function initializeLanguageSwitcher() {
    // Set default language or get from localStorage
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Apply translations on page load
    applyTranslations(currentLang);
    
    // Add event listener to language switcher button
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', function() {
            // Toggle between languages
            currentLang = currentLang === 'en' ? 'fi' : 'en';
            
            // Save to localStorage
            localStorage.setItem('preferredLanguage', currentLang);
            
            // Apply translations
            applyTranslations(currentLang);
        });
    }
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[lang][key];
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update language switcher text
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher && translations[lang] && translations[lang]['lang_switch']) {
        langSwitcher.innerHTML = translations[lang]['lang_switch'];
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Basic testimonial slider (if needed)
let testimonialIndex = 0;
const autoSlideTestimonials = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 3) {
        testimonialIndex++;
        if (testimonialIndex >= testimonials.length) {
            testimonialIndex = 0;
        }
        
        const testimonialWidth = testimonials[0].offsetWidth;
        document.querySelector('.testimonial-grid').style.transform = `translateX(-${testimonialIndex * testimonialWidth}px)`;
        
        setTimeout(autoSlideTestimonials, 5000);
    }
}

// Initialize slider with delay
setTimeout(autoSlideTestimonials, 5000);
