document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('data/services.json');
        const data = await response.json();
        renderServices(data.services);
        // Yahan function ka naam theek karein
        initServicesCarousels(); // initCarousels() ko isse replace karein
    } catch (error) {
        console.error('Error loading services:', error);
    }
});

function renderServices(categories) {
    const servicesSection = document.getElementById('services');
    
    categories.forEach(category => {
        const categoryHTML = `
            <div class="services-category" data-aos="fade-up">
                <div class="category-header">
                    <img src="images/services/${category.icon}" alt="${category.category}">
                    <h3>${category.category}</h3>
                </div>
                <div class="services-container">
                    <div class="services-carousel">
                        ${category.services.map(service => `
                            <div class="service-card" onclick="window.location.href='services-pages/${service.slug}.html'">
                                <div class="card-content">
                                    <img src="images/services/${service.icon}" alt="${service.title}" class="service-icon">
                                    <h4>${service.title}</h4>
                                    <p>${service.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="carousel-nav">
                        <button class="carousel-prev">❮</button>
                        <button class="carousel-next">❯</button>
                    </div>
                </div>
            </div>
        `;
        servicesSection.insertAdjacentHTML('beforeend', categoryHTML);
    });
}

// Updated Services Carousel Functionality
function initServicesCarousels() {
    const serviceContainers = document.querySelectorAll('.services-category');
    
    serviceContainers.forEach(container => {
        const carousel = container.querySelector('.services-carousel');
        const cards = Array.from(carousel.querySelectorAll('.service-card'));
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const totalCards = cards.length;
        let currentIndex = 0;
        let carouselInterval;
        let isPaused = false;
        let isAnimating = false;

        // Initialize cards
        updateCards();

        // Start auto rotation
        startCarousel();

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            navigate(-1);
        });

        nextBtn.addEventListener('click', () => {
            navigate(1);
        });

        // Card click handling
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (isAnimating) return;
                
                const clickedIndex = cards.indexOf(e.currentTarget);
                if (clickedIndex !== currentIndex) {
                    currentIndex = clickedIndex;
                    updateCards();
                } else {
                    // Toggle active state if clicking center card
                    card.classList.toggle('active');
                }
                resetCarousel();
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
            clearInterval(carouselInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
            startCarousel();
        });

        function navigate(direction) {
            if (isAnimating) return;
            currentIndex = (currentIndex + direction + totalCards) % totalCards;
            updateCards();
            resetCarousel();
        }

        function updateCards() {
            if (isAnimating) return;
            isAnimating = true;

            // Reset all cards
            cards.forEach(card => {
                card.classList.remove('center', 'left', 'right', 'active');
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '0';
                card.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });

            // Calculate positions
            const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
            const rightIndex = (currentIndex + 1) % totalCards;

            // Position left card
            cards[leftIndex].classList.add('left');
            cards[leftIndex].style.opacity = '0.6';
            cards[leftIndex].style.transform = 'translate(-150%, -50%) scale(0.7) rotateY(30deg)';

            // Position center card
            cards[currentIndex].classList.add('center');
            cards[currentIndex].style.opacity = '1';
            cards[currentIndex].style.transform = 'translate(-50%, -50%) scale(1.1)';

            // Position right card
            cards[rightIndex].classList.add('right');
            cards[rightIndex].style.opacity = '0.6';
            cards[rightIndex].style.transform = 'translate(50%, -50%) scale(0.7) rotateY(-30deg)';

            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function startCarousel() {
            if (isPaused) return;
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCards();
            }, 4000);
        }

        function resetCarousel() {
            clearInterval(carouselInterval);
            startCarousel();
        }
    });
}
