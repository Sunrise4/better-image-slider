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

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('carousel_indicator--current-slide');
  targetDot.classList.add('carousel_indicator--current-slide');
}

//when i click left, move slides to the let
prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector(
    '.carousel_slide--current-slide',
  );
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = navBar.querySelector(
    '.carousel_indicator--current-slide',
  );
  const prevDot = currentDot.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});
//when i click right, move slides to the right
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector(
    '.carousel_slide--current-slide',
  );
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = navBar.querySelector(
    '.carousel_indicator--current-slide',
  );
  const nextDot = currentDot.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});
//when i click the nav indicators, move the the corresponding slide

navBar.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentSlide = track.querySelector(
    '.carousel_slide--current-slide',
  );
  const currentDot = navBar.querySelector(
    '.carousel_indicator--current-slide',
  );
  const targetIndex = navDots.findIndex((dot) => dot === targetDot);
  console.log(targetIndex);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);
});
//36min on vid
