const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);

const prevButton = document.querySelector('.carousel_button-left');
const nextButton = document.querySelector('.carousel_button-right');

const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current-slide');
	targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('current-slide');
	targetDot.classList.add('current-slide');
};

// when i click left move slide to the left
prevButton.addEventListener('click', (event) => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;

	const currentDot = dotsNav.querySelector('.current-slide');
	const prevDot = currentDot.previousElementSibling;

	moveToSlide(track, currentSlide, prevSlide);
	updateDots(currentDot, prevDot);
});

// when i click right move slide to the right
nextButton.addEventListener('click', (event) => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;

	const currentDot = dotsNav.querySelector('.current-slide');
	const nextDot = currentDot.nextElementSibling;

	moveToSlide(track, currentSlide, nextSlide);
	updateDots(currentDot, nextDot);
});

// when i click the nav indicators, move to that slide
dotsNav.addEventListener('click', (event) => {
	// what indicator was clicked on
	const targetDot = event.target.closest('button');

	if (!targetDot) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentDot = dotsNav.querySelector('.current-slide');

	const targetIndex = dots.findIndex((dot) => {
		return dot === targetDot;
	});

	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);

	currentDot.classList.remove('current-slide');
	targetDot.classList.add('current-slide');

	updateDots(currentDot, targetDot);
});
