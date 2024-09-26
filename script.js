const segments = document.querySelectorAll('.segment');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

function moveCentipede() {
	let offsetX = mouseX;
	let offsetY = mouseY;

	segments.forEach((segment, index) => {
		const rect = segment.getBoundingClientRect();
		const currentX = rect.left + window.scrollX;
		const currentY = rect.top + window.scrollY;
		const dx = offsetX - currentX;
		const dy = offsetY - currentY;

		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance > 1) {
			const moveX = dx * 0.2;
			const moveY = dy * 0.2;

			segment.style.left = currentX + moveX + 'px';
			segment.style.top = currentY + moveY + 'px';
		}

		offsetX = currentX;
		offsetY = currentY;
	});

	requestAnimationFrame(moveCentipede);
}

moveCentipede();
