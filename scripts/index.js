const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const navBar = document.querySelector('.carousel_nav');
const navDots = Array.from(navBar.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
setSlidePosition();

function setSlidePosition() {
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });
}

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left;
  +')';
  currentSlide.classList.remove('carousel_slide--current-slide');
  targetSlide.classList.add('carousel_slide--current-slide');
}

//when i click left, move slides to the let
prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector(
    '.carousel_slide--current-slide',
  );
  const prevSlide = currentSlide.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);
});
//when i click right, move slides to the right
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector(
    '.carousel_slide--current-slide',
  );
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
});
//when i click the nav indicators, move the the corresponding slide

//36min on vid
