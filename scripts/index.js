const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const navBar = document.querySelector('.carousel_nav');
const navDots = Array.from(navBar.children);
const slideWidth = slides[0].getBoundingClientRect().width;

function setSlidePosition() {
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });
}

function moveToSlide(track, currentSlide, targetSlide) {
  if (!targetSlide) {
    track.style.transform = 'translateX(0px)';
    currentSlide.classList.remove('carousel_slide--current-slide');
    slides[0].classList.add('carousel_slide--current-slide');
  } else {
    track.style.transform = 'translateX(-' + targetSlide.style.left;
    +')';
    currentSlide.classList.remove('carousel_slide--current-slide');
    targetSlide.classList.add('carousel_slide--current-slide');
  }
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('carousel_indicator--current-slide');

  if (!targetDot) {
    navDots[0].classList.add('carousel_indicator--current-slide');
  } else {
    targetDot.classList.add('carousel_indicator--current-slide');
  }
}

function hideShowArrows(slides, prevButton, nextButton, targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

function slideTimer() {
  setInterval((e) => {
    const currentSlide = track.querySelector(
      '.carousel_slide--current-slide',
    );
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navBar.querySelector(
      '.carousel_indicator--current-slide',
    );
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(
      (slide) => slide === nextSlide,
    );

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
  }, 5000);
}

//arrange the slides next to one another
setSlidePosition();

//set auto slider
slideTimer();

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
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
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
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
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
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
