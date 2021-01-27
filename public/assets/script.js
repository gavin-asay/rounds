const gridContainerEl = document.querySelector('#grid-container');
const subgridEl = document.querySelector('#subgrid');
const shiftStart = dayjs().hour(22).minute(00);
let studentCount = 10;
console.log(shiftStart);

const fillGrid = () => {
	for (let i = 0; i < 37; i++) {
		let headerItemEl = document.createElement('div');
		headerItemEl.className = 'grid-header-item';
		headerItemEl.textContent = shiftStart.add(15 * i, 'minute').format('HHmm');
		subgridEl.appendChild(headerItemEl);
	}

	for (let i = 0; i < 37 * 10; i++) {
		let gridItemEl = document.createElement('input');
		gridItemEl.className = 'grid-item';
		gridItemEl.setAttribute('type', 'text');
		gridItemEl.setAttribute('maxlength', '2');
		gridItemEl.setAttribute(
			'pattern',
			'[ABDHIMORSV]{1}|(SN)|(ST)|(SW)|(NM)|(GT)|(AW)|(ES)'
		);
		subgridEl.appendChild(gridItemEl);
	}
};

fillGrid();

subgridEl.addEventListener('change', function (e) {
	console.log(e);
	let box = e.target;
	box.value = box.value.toUpperCase();

	if (!box.validity.patternMismatch) {
		box.classList = `grid-item ${box.value}`;
	}
});

subgridEl.addEventListener('keydown', function (e) {
	if (e.key === 'Backspace' && !e.target.value)
		e.target.previousSibling.focus();
});
