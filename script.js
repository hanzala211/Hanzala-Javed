'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navUl = document.querySelector('.nav__links');
const allSections = document.querySelectorAll('.section');
let imgTargets = document.querySelectorAll('img[data-src]');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const slide = document.querySelectorAll('.slide');
const btnNext = document.querySelector('.slider__btn--right');
const btnPrev = document.querySelector('.slider__btn--left');
const operationContainer = document.querySelector('.operations__tab-container');
const operationBtn = document.querySelectorAll('.operations__btn');
const operationContent = document.querySelectorAll('.operations__content');
const dotsContainer = document.querySelector('.dots');
const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
	btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

navUl.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const sect = e.target.getAttribute('href');
		document.querySelector(sect).scrollIntoView({ behavior: 'smooth' });
	}
});

let callBackFun = function (entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			nav.classList.add('sticky');
		} else {
			nav.classList.remove('sticky');
		}
	});
};
const callBackObj = {
	root: null,
	threshold: 0,
	rootMargin: '-90px',
};
const observerHeader = new IntersectionObserver(callBackFun, callBackObj);
observerHeader.observe(header); // it observes with the header
// \\
let backFun = function (entries /* Object */) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove('section--hidden');
		}
	});
};
let backObj = {
	root: null,
	threshold: 0.1,
	rootMargin: '10px',
};
const observerSection = new IntersectionObserver(backFun, backObj);
allSections.forEach((section) => {
	observerSection.observe(section);
	section.classList.add('section--hidden');
});
operationContainer.addEventListener('click', function (e) {
	e.preventDefault();
	const checked = e.target.closest('.operations__btn');

	if (checked) {
		operationBtn.forEach((el) =>
			el.classList.remove('operations__tab--active')
		);
		checked.classList.add('operations__tab--active');
		operationContent.forEach((el) =>
			el.classList.remove('operations__content--active')
		);
		document
			.querySelector(`.operations__content--${checked.dataset.tab}`)
			.classList.add('operations__content--active');
	}
});

let imgObj = {
	root: null,
	threshold: 0,
};
function imgFunc(entries) {
	entries.forEach((entry) => {
		entry.target.src = entry.target.dataset.src;
		entry.target.addEventListener('load', function () {
			entry.target.classList.remove('lazy-img');
		});
	});
}
const observerImg = new IntersectionObserver(imgFunc, imgObj);

imgTargets.forEach((img) => {
	observerImg.observe(img);
});
let currentSlide = 0;
let maxSlide = slide.length;

slide.forEach((s, i) => {
	s.style.transform = `translate(${100 * i}%)`;
});

function goToSlide(slides) {
	slide.forEach((s, i) => {
		s.style.transform = `translateX(${100 * (i - slides)}%)`;
	});
}
function activateDot(slides) {
	document.querySelectorAll('.dots__dot').forEach((dot) => {
		dot.classList.remove('dots__dot--active');
	});
	document
		.querySelectorAll(`.dots__dot[data-tab = "${slides}"]`)
		.forEach((dot) => {
			dot.classList.add('dots__dot--active');
		});
	currentSlide = slides;
}
function nextSlide() {
	if (currentSlide >= maxSlide - 1) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}
	goToSlide(currentSlide);
	activateDot(currentSlide);
}
function prevSlide() {
	if (currentSlide === 0) {
		currentSlide = maxSlide - 1;
	} else {
		currentSlide--;
	}
	goToSlide(currentSlide);
	activateDot(currentSlide);
}

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
	if (event.key === 'ArrowRight') {
		nextSlide();
	} else if (event.key === 'ArrowLeft') {
		prevSlide();
	}
});
const createDots = function () {
	slide.forEach(function (_, i) {
		dotsContainer.insertAdjacentHTML(
			'beforeend',
			`<button class ="dots__dot" data-tab ="${i}"></button>`
		);
	});
};
createDots();
dotsContainer.addEventListener('click', function (e) {
	if (e.target.classList.contains('dots__dot')) {
		let dataDot = e.target.closest('.dots__dot');
		goToSlide(dataDot.dataset.tab);
		activateDot(dataDot.dataset.tab);
	}
});
activateDot(0);
