/**
 * Nedits Edition - Main JavaScript File
 * Contains all animations and interactive elements
 */

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Add spinner animation (only once)
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .spinner {
        animation: spin 1s linear infinite;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .spinner circle {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-linecap: round;
    }
`;
document.head.appendChild(style);

// ----------------------------------------------------
// Naya About Us Section ka Code
// ----------------------------------------------------

// Load About Data from JSON
async function loadAboutData() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();
        populateAboutSection(data.about);
    } catch (error) {
        console.error('Error loading about data:', error);
    }
}

function populateAboutSection(aboutData) {
    // Set text content
    const introText = document.getElementById('about-intro-text');
    if (introText) introText.textContent = aboutData.intro;
    
    const missionText = document.getElementById('about-mission-text');
    if (missionText) missionText.textContent = aboutData.mission;
    
    const visionText = document.getElementById('about-vision-text');
    if (visionText) visionText.textContent = aboutData.vision;
    
    // Create features
    const featuresContainer = document.getElementById('about-features');
    if (featuresContainer) {
        aboutData.features.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <div class="feature-icon">${feature.icon}</div>
                <div class="feature-content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            `;
            featuresContainer.appendChild(featureCard);
        });
    }
    
    // Create stats
    const statsContainer = document.getElementById('about-stats');
    if (statsContainer) {
        aboutData.stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            `;
            statsContainer.appendChild(statItem);
        });
    }
    
    // Animate stats
    animateStats();
}

function animateStats() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const statValues = document.querySelectorAll('#about-stats .stat-value');
                statValues.forEach(value => {
                    const target = parseInt(value.textContent.replace('+', ''));
                    if (!isNaN(target)) {
                        animateCounter(value, target, 2000);
                    }
                });
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(aboutSection);
    }
}

// ----------------------------------------------------
// Main Initialization when DOM is loaded
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load About section data and animations
    loadAboutData();

    // 2. Hero Background Slideshow
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroImages = [
            'images/hero-bg1.jpg',
            'images/hero-bg2.jpg',
            'images/hero-bg3.jpg',
            'images/hero-bg4.jpg',
            'images/hero-bg5.jpg',
            'images/hero-bg6.jpg'
        ];
        let availableImages = [...heroImages];

        function changeBackground() {
            if (availableImages.length === 0) availableImages = [...heroImages];
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            const selectedImage = availableImages.splice(randomIndex, 1)[0];
            hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${selectedImage}')`;
        }

        changeBackground();
        setInterval(changeBackground, 3000);
    }

    // 3. Services Carousel (Yeh aapki services.js file se aayega)
    
    // 4. About Section Animations (AOS library handle karegi)
    document.querySelectorAll('#about [data-anim]').forEach(el => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                el.classList.add('visible');
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(el);
    });

    // 5. Section Headings Animation
    const sectionHeadings = document.querySelectorAll('.section h2');
    if (sectionHeadings.length > 0) {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    headingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        sectionHeadings.forEach(h2 => headingObserver.observe(h2));
    }

    // 6. Smooth Scrolling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            if (link.hash && document.querySelector(link.hash)) {
                e.preventDefault();
                document.querySelector(link.hash).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // 7. Timeline Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        timelineItems.forEach(item => timelineObserver.observe(item));
    }

    // 8. Testimonials Carousel
    initTestimonialsCarousel();

    // 9. Contact Form
    handleContactForm();

    // 10. Footer Functionality
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
                </svg>
            `;
            
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                `;
                emailInput.value = '';
                
                const successMsg = document.createElement('p');
                successMsg.className = 'newsletter-success';
                successMsg.textContent = 'Thanks for subscribing!';
                successMsg.style.color = '#7b0091';
                successMsg.style.marginTop = '10px';
                successMsg.style.fontSize = '0.9rem';
                newsletterForm.appendChild(successMsg);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    successMsg.remove();
                }, 3000);
            }, 1500);
        });
    }
    
    // Footer link animations
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-services a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
});


// ----------------------------------------------------
// Global Functions
// ----------------------------------------------------

// Counter Animation Function
function animateCounter(element, target, duration) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Testimonials Carousel Function
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carousel || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let autoScrollInterval;
    let isHovering = false;

    function getVisibleCardsCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function scrollToCard(index) {
        const cardWidth = cards[0].offsetWidth + 30;
        carousel.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        updateActiveDot(index);
    }

    function getCurrentGroupIndex() {
        const cardWidth = cards[0].offsetWidth + 30;
        const visibleCards = getVisibleCardsCount();
        return Math.round(carousel.scrollLeft / (cardWidth * visibleCards));
    }

    function updateActiveDot(index) {
        document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
        const dots = document.querySelectorAll('.carousel-dot');
        const groupIndex = Math.floor(index / getVisibleCardsCount());
        if (dots[groupIndex]) {
            dots[groupIndex].classList.add('active');
        }
    }

    function generateDots() {
        dotsContainer.innerHTML = '';
        const visibleCards = getVisibleCardsCount();
        const totalGroups = Math.ceil(cards.length / visibleCards);

        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(i * visibleCards));
            dotsContainer.appendChild(dot);
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (isHovering) return;

            const visibleCards = getVisibleCardsCount();
            const currentIndex = getCurrentGroupIndex();
            const totalGroups = Math.ceil(cards.length / visibleCards);
            const nextIndex = (currentIndex + 1) % totalGroups;

            scrollToCard(nextIndex * visibleCards);
        }, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        scrollToCard(Math.max(0, index - 1) * visibleCards);
        resetAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
        scrollToCard(Math.min(maxIndex, index + 1) * visibleCards);
        resetAutoScroll();
    });

    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        resetAutoScroll();
    });

    carousel.addEventListener('scroll', () => {
        updateActiveDot(getCurrentGroupIndex() * getVisibleCardsCount());
    });

    window.addEventListener('resize', () => {
        generateDots();
        resetAutoScroll();
    });

    generateDots();
    startAutoScroll();
}

// Contact Form Function
function handleContactForm() {
    const form = document.getElementById('neditsContactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
            </svg>
            Sending...
        `;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Message Sent!
            `;
            
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Error! Try Again
            `;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    });
}
