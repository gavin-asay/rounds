const gridContainerEl = document.querySelector('#grid-container');
const subgridEl = document.querySelector('#subgrid');
const inputModalEl = document.querySelector('#input-modal');
const modalBodyEl = document.querySelector('.modal-body');
const shiftStart = dayjs().hour(22).minute(00);
let studentCount = 10;
let chartData = [];
let selectedFields = [];
let recentlySelected = [];
let keyInput = '';
const validCodes = /^[ABDHIMORSV]{1}$|^(SN)$|^(ST)$|^(SW)$|^(NM)$|^(GT)$|^(AW)$|^(ES)$/;

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
		// gridItemEl.setAttribute('type', 'text');
		// gridItemEl.setAttribute('maxlength', '2');
		// gridItemEl.setAttribute('pattern', '[ABDHIMORSV]{1}|(SN)|(ST)|(SW)|(NM)|(GT)|(AW)|(ES)');
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

// subgridEl.addEventListener('change', function (e) {
// 	let box = e.target;
// 	box.value = box.value.toUpperCase();

// 	if (!box.validity.patternMismatch) {
// 		box.classList = `grid-item ${box.value}`;
// 	} else return;

// 	let student = box.getAttribute('data-student');
// 	let timestamp = box.getAttribute('data-timestamp');

// 	let postBody = {
// 		student: student,
// 		time: timestamp,
// 		status: box.value,
// 	};
// 	console.log(postBody);

// 	fetch('/api/bedChart', {
// 		method: 'POST',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(postBody),
// 	}).then(res => {
// 		if (res.status === 500) serverErrorHandler();
// 	});
// });

// subgridEl.addEventListener('keydown', function (e) {
// 	if (e.key === 'Backspace' && !e.target.value) e.target.previousSibling.focus();

// 	// if (e.key === 'Return')
// });

function renderInputModal(e) {
	if (!selectedFields.length) return;
	if (e.target) selectedFields.sort((a, b) => a.offsetLeft - b.offsetLeft);

	inputModalEl.setAttribute('style', `top: ${selectedFields[selectedFields.length - 1].offsetTop - 50}px; left: ${selectedFields[selectedFields.length - 1].offsetLeft + 65}px`);
	inputModalEl.className = 'visible';
}

let modalHide;

function gridInputHandler(e, value = (e.key || e.target.textContent).toUpperCase()) {
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

function gridSelector(e) {
	e.preventDefault();
	if (e.buttons !== 1 || !e.target.classList.contains('grid-item')) return;
	if (modalHide) {
		window.clearTimeout(modalHide);
		recentlySelected.forEach(el => el.classList.remove('selected'));
		recentlySelected = [];
	}

	const { target } = e;
	if (!selectedFields.includes(target)) selectedFields.push(target);
	else {
		target.classList.remove('selected');
		selectedFields.splice(selectedFields.indexOf(target), 1);
	}

	selectedFields.forEach(el => el.classList.add('selected'));
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

subgridEl.addEventListener('mouseover', gridSelector);
subgridEl.addEventListener('mousedown', gridSelector);
document.addEventListener('mouseup', renderInputModal);
document.addEventListener('keydown', keydownHandler);
modalBodyEl.addEventListener('click', gridInputHandler);

prepGrid();
fetchBedChart();
