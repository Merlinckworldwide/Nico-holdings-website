const track = document.querySelector('.service-track');
if (track) {
  const cards = Array.from(track.children);
  const slider = document.querySelector('.service-slider');
  let slideIndex = 0;
  let slideInterval = null;

  function visibleCards() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
  }

  function cardWidth() {
    const style = getComputedStyle(cards[0]);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function updateSlider() {
    const offset = cardWidth() * slideIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function resetSlider() {
    track.style.transition = 'none';
    slideIndex = 0;
    updateSlider();
  }

  function nextSlide() {
    const maxIndex = cards.length - visibleCards();
    slideIndex += 1;
    track.style.transition = 'transform 0.6s ease';
    updateSlider();
    if (slideIndex > maxIndex) {
      setTimeout(() => {
        resetSlider();
      }, 620);
    }
  }

  function startAutoScroll() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  slider.addEventListener('mouseenter', () => {
    if (slideInterval) clearInterval(slideInterval);
  });

  slider.addEventListener('mouseleave', () => {
    startAutoScroll();
  });

  slider.addEventListener('touchstart', () => {
    if (slideInterval) clearInterval(slideInterval);
  });

  slider.addEventListener('touchend', () => {
    startAutoScroll();
  });

  window.addEventListener('resize', () => {
    updateSlider();
  });

  startAutoScroll();
}
