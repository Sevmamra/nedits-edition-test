document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/services.json');
    const data = await response.json();
    renderServices(data.services);
    initOptimizedCarousels();
  } catch (error) {
    console.error('Error loading services:', error);
  }
});

function initOptimizedCarousels() {
  const carousels = document.querySelectorAll('.services-carousel');
  
  carousels.forEach(carousel => {
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    const totalCards = cards.length;
    let currentIndex = 0;
    let animationFrame;
    let isAnimating = false;
    
    // Use will-change for performance
    cards.forEach(card => {
      card.style.willChange = 'transform, opacity';
    });

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCards, 100);
    });

    // Initialize
    updateCards();

    // Navigation
    carousel.closest('.services-container').querySelector('.carousel-next').addEventListener('click', () => {
      navigate(1);
    });
    
    carousel.closest('.services-container').querySelector('.carousel-prev').addEventListener('click', () => {
      navigate(-1);
    });

    // Card click handling
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (isAnimating) return;
        const clickedIndex = cards.indexOf(e.currentTarget);
        if (clickedIndex !== currentIndex) {
          currentIndex = clickedIndex;
          updateCards();
        }
      });
    });

    function navigate(direction) {
      if (isAnimating) return;
      cancelAnimationFrame(animationFrame);
      currentIndex = (currentIndex + direction + totalCards) % totalCards;
      updateCards();
    }

    function updateCards() {
      if (isAnimating) return;
      isAnimating = true;
      
      // Use requestAnimationFrame for smoother animations
      animationFrame = requestAnimationFrame(() => {
        const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
        const rightIndex = (currentIndex + 1) % totalCards;

        // Reset all cards first
        cards.forEach(card => {
          card.style.transition = 'none';
          card.style.transform = 'translate(-50%, -50%) scale(0.8)';
          card.style.opacity = '0';
          card.classList.remove('center', 'left', 'right');
        });

        // Force reflow before applying new styles
        void carousel.offsetHeight;

        // Apply new positions with transitions
        cards.forEach(card => {
          card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out';
        });

        // Position cards
        cards[leftIndex].classList.add('left');
        cards[leftIndex].style.opacity = '0.6';
        cards[leftIndex].style.transform = 'translate(-150%, -50%) scale(0.7) rotateY(30deg)';

        cards[currentIndex].classList.add('center');
        cards[currentIndex].style.opacity = '1';
        cards[currentIndex].style.transform = 'translate(-50%, -50%) scale(1.1)';

        cards[rightIndex].classList.add('right');
        cards[rightIndex].style.opacity = '0.6';
        cards[rightIndex].style.transform = 'translate(50%, -50%) scale(0.7) rotateY(-30deg)';

        isAnimating = false;
      });
    }
  });
}
