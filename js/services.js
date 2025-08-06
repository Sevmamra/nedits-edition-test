document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/services.json');
    const data = await response.json();
    renderServices(data.services);
    initCarousels();
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

function initCarousels() {
  // Your existing carousel initialization code
  // (Keep the same carousel functionality as before)
}
