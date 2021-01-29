const gridContainerEl = document.querySelector('#grid-container');
const subgridEl = document.querySelector('#subgrid');
const shiftStart = dayjs().hour(22).minute(00);
let studentCount = 10;
let chartData = [];

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

const fillGrid = studentList => {
	studentList.forEach((student, i) => {
		let nameEl = document.createElement('div');
		nameEl.textContent = `${student.firstName} ${student.lastName}`;
		nameEl.classList = 'name';
		nameEl.setAttribute('data-row', i);
		nameEl.setAttribute(
			'data-student',
			`${student.firstName}${student.lastName}`
		);

		let bedEl = document.createElement('div');
		bedEl.textContent = student.bed.toString();
		bedEl.classList = 'bed';
		nameEl.setAttribute('data-row', i);
		nameEl.setAttribute(
			'data-student',
			`${student.firstName}${student.lastName}`
		);

		gridContainerEl.appendChild(nameEl);
		gridContainerEl.appendChild(bedEl);

		for (let j = 0; j < 37; j++) {
			let gridItemEl = document.createElement('input');
			gridItemEl.className = 'grid-item';
			gridItemEl.setAttribute('type', 'text');
			gridItemEl.setAttribute('maxlength', '2');
			gridItemEl.setAttribute(
				'pattern',
				'[ABDHIMORSV]{1}|(SN)|(ST)|(SW)|(NM)|(GT)|(AW)|(ES)'
			);
			gridItemEl.setAttribute('data-row', i);
			gridItemEl.setAttribute(
				'data-student',
				`${student.firstName}${student.lastName}`
			);
			gridItemEl.setAttribute('data-column', j);
			gridItemEl.setAttribute(
				'data-timestamp',
				shiftStart.add(15 * j, 'minute').format('HHmm')
			);
			subgridEl.appendChild(gridItemEl);
		}
	});
};

function fetchBedChart() {
	let queryUrl = '/api/bedchart/Rainier';
	fetch(queryUrl)
		.then(res => {
			if (res.ok) return res.json();
		})
		.then(data => {
			fillGrid(data);
		});
}

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

prepGrid();
fetchBedChart();
