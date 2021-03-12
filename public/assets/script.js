const gridContainerEl = document.querySelector('#grid-container');
const subgridEl = document.querySelector('#subgrid');
const inputModalEl = document.querySelector('#input-modal');
const modalBodyEl = document.querySelector('.modal-body');
const shiftStart = dayjs().hour(22).minute(00);
const shiftEnd = shiftStart.day() > 4 ? shiftStart.add(10, 'hour') : shiftStart.add(9, 'hour');
let studentCount = 10;
let chartData = [];
let selectedFields = [];
let recentlySelected = [];
let keyInput = '';
const validCodes = /^[ABDHIMORSV]{1}$|^SN$|^ST$|^SW$|^NM$|^GT$|^AW$|^ES$/;
let deselectMode = false;

const prepGrid = () => {
	let nameHeaderEl = document.createElement('div');
	nameHeaderEl.classList = 'grid-label';
	nameHeaderEl.textContent = 'Name';
	gridContainerEl.appendChild(nameHeaderEl);

	let bedHeaderEl = document.createElement('div');
	bedHeaderEl.classList = 'grid-label bed-header';
	bedHeaderEl.textContent = 'Bed';
	gridContainerEl.appendChild(bedHeaderEl);

	for (let i = 0; i < 37; i++) {
		let headerItemEl = document.createElement('div');
		headerItemEl.className = 'grid-header-item';
		headerItemEl.textContent = shiftStart.add(15 * i, 'minute').format('HHmm');
		subgridEl.appendChild(headerItemEl);
	}
};

const addStudentToChart = (student, i) => {
	let nameEl = document.createElement('div');
	nameEl.textContent = `${student.firstName} ${student.lastName}`;
	nameEl.classList = 'name';
	nameEl.setAttribute('data-row', i);
	nameEl.setAttribute('data-student', `${student.firstName}${student.lastName}`);

	let bedEl = document.createElement('div');
	bedEl.textContent = student.bed.toString();
	bedEl.classList = 'bed';
	nameEl.setAttribute('data-row', i);
	nameEl.setAttribute('data-student', `${student.firstName}${student.lastName}`);

	gridContainerEl.appendChild(nameEl);
	gridContainerEl.appendChild(bedEl);

	for (let j = 0; j < 37; j++) {
		let gridItemEl = document.createElement('div');
		gridItemEl.className = 'grid-item';
		gridItemEl.setAttribute('data-row', i);
		gridItemEl.setAttribute('data-student', `${student.firstName}${student.lastName}`.toLowerCase());
		gridItemEl.setAttribute('data-column', j);
		gridItemEl.setAttribute('data-timestamp', shiftStart.add(15 * j, 'minute').format('HHmm'));
		subgridEl.appendChild(gridItemEl);
	}
};

const fillGrid = studentList => {
	studentList.forEach((student, i) => addStudentToChart(student, i));
};

async function fetchBedChart() {
	try {
		const queryUrl = '/api/bedchart/Rainier';
		const res = await fetch(queryUrl);
		console.log(res);
		const data = await res.json();
		console.log(data);
		fillGrid(data.roster);
	} catch (err) {
		console.log(err);
	}
}

function renderInputModal(e) {
	deselectMode = false;
	if (!selectedFields.length) {
		inputModalEl.className = '';
		return;
	}

	selectedFields.sort((a, b) => b.offsetLeft - a.offsetLeft);
	const rect = selectedFields[0].getBoundingClientRect();
	const left = window.innerWidth - rect.right < 350 ? selectedFields[0].offsetLeft - 165 : selectedFields[0].offsetLeft + 65;

	inputModalEl.setAttribute('style', `top: ${selectedFields[0].offsetTop - 50}px; left: ${left}px`);
	inputModalEl.className = 'visible';
}

let modalHide;

function gridInputHandler(e, value = e.key?.toUpperCase() || e.target.textContent) {
	window.clearTimeout(modalHide);
	if (!value.match(validCodes)) return;

	selectedFields.forEach(el => {
		el.textContent = value;
		el.classList = `grid-item selected ${value}`;
	});
	recentlySelected.forEach(el => {
		el.textContent = value;
		el.classList = `grid-item selected ${value}`;
	});

	if (selectedFields.length) recentlySelected = [...selectedFields];
	selectedFields = [];

	modalHide = setTimeout(() => {
		recentlySelected.forEach(el => el.classList.remove('selected'));
		inputModalEl.classList.remove('visible');
	}, 2000);
}

function gridSelectorMouse(e) {
	e.preventDefault();
	if ((e.buttons !== 1 && !e.touches) || !e.target.classList.contains('grid-item')) return;
	if (modalHide) {
		window.clearTimeout(modalHide);
		recentlySelected.forEach(el => el.classList.remove('selected'));
		recentlySelected = [];
	}

	const { target } = e;
	if (target.classList.contains('selected') && deselectMode) {
		target.classList.remove('selected');
		selectedFields.splice(selectedFields.indexOf(target), 1);
	} else if (!target.classList.contains('selected') && !deselectMode) {
		selectedFields.push(target);
		selectedFields.forEach(el => el.classList.add('selected'));
	}
}

function gridSelectorTouch(e) {
	e.preventDefault();
	if (e.touches.length !== 1) return;

	if (modalHide) {
		window.clearTimeout(modalHide);
		recentlySelected.forEach(el => el.classList.remove('selected'));
		recentlySelected = [];
	}

	const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
	if (target.classList.contains('selected') && deselectMode) {
		target.classList.remove('selected');
		selectedFields.splice(selectedFields.indexOf(target), 1);
	} else if (!target.classList.contains('selected') && !deselectMode) {
		selectedFields.push(target);
		selectedFields.forEach(el => el.classList.add('selected'));
	}
}

function keydownHandler(e) {
	if (!selectedFields.length && !recentlySelected.length) return;
	if (e.metaKey || e.ctrlKey) return;

	if (e.key.toUpperCase() === 'N') return gridInputHandler(e, 'NM');

	if (keyInput.length === 0 && e.key.toUpperCase().match(validCodes)) keyInput += e.key.toUpperCase();
	else if (keyInput.length === 1 && (keyInput + e.key.toUpperCase()).match(validCodes)) keyInput += e.key.toUpperCase();
	else if (keyInput.length === 2 && e.key.toUpperCase().match(validCodes)) {
		keyInput = '';
		keyInput += e.key.toUpperCase();
	}

	window.clearTimeout(modalHide);
	gridInputHandler(e, keyInput || undefined);
}

function selectToggleMouse(e) {
	e.preventDefault();
	if (e.target.classList.contains('selected')) deselectMode = true;
	gridSelectorMouse(e);
}

function selectToggleTouch(e) {
	e.preventDefault();
	if (document.elementsFromPoint(e.clientX, e.clientY)) deselectMode = true;
	gridSelectorTouch(e);
}

subgridEl.addEventListener('mouseover', gridSelectorMouse);
subgridEl.addEventListener('mousedown', selectToggleMouse);
document.addEventListener('mouseup', renderInputModal);
document.addEventListener('keydown', keydownHandler);
modalBodyEl.addEventListener('click', gridInputHandler);
subgridEl.addEventListener('touchstart', selectToggleMouse);
subgridEl.addEventListener('touchmove', gridSelectorTouch);
subgridEl.addEventListener('touchend', renderInputModal);

prepGrid();
fetchBedChart();
