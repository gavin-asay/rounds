const gridContainerEl = document.querySelector('#grid-container');
const subgridEl = document.querySelector('#subgrid');
const shiftStart = dayjs().hour(22).minute(00);
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
		subgridEl.appendChild(gridItemEl);
	}
};

fillGrid();

subgridEl.addEventListener('input', function (e) {
	e.target.value = e.target.value.toUpperCase();
	e.target.classList = `grid-item ${e.target.value}`;
});
