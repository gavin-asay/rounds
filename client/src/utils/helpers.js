export function modalColor(props) {
	switch (props.value) {
		case 'S':
			return `lightskyblue`;
		case 'A':
			return `yellow`;
		case 'R':
			return `lightgreen`;
		case 'SN':
		case 'ST':
		case 'SW':
			return `rgb(0, 230, 230)`;
		case 'NM':
			return `white`;
		case 'GT':
			return `beige`;
		case 'B':
		case 'ES':
			return `white`;
		case 'D':
			return `red`;
		case 'M':
			return `lightgray`;
		case 'I':
			return `rgb(173, 230, 61)`;
		case 'V':
		case 'H':
		case 'AW':
		case 'DT':
			return 'white';
		default:
			return 'white';
	}
}
