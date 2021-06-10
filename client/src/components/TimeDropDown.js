import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { shiftToRecent, updateRecentlySelected, updateDropdownTime } from '../utils/gridReducer';
import { updateData } from '../utils/unitReducer';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TimeDropdownMenu = styled.div`
	background-color: #777777;
	border-radius: 10px;
	padding: 10px;
	position: absolute;
	width: max-content;
	left: ${props => `${props.timeDropdownOffset[1]}px;`};
`;

const MenuItem = styled.button`
	color: white;
	list-style-type: none;
	background-color: #777777;
	border: none;
`;

function TimeDropdown() {
	const unitData = useSelector(state => state.units);
	const selectedCells = useSelector(state => state.grid.selectedCells);
	const timeDropdownOffset = useSelector(state => state.grid.timeDropdownOffset);
	const dropdownTime = useSelector(state => state.grid.dropdownTime);
	const dispatch = useDispatch();

	function repeat(e) {
		window.timeDropdownHide = null;
		dispatch(updateRecentlySelected([]));

		const previousTime = dayjs(dropdownTime, 'HHmm').subtract(15, 'minute').format('HHmm');
		const newData = selectedCells.reduce((dataset, cell) => {
			const unitState = unitData.find(unit => unit.name.replace(' ', '') === cell.unitName);

			if (!dataset[cell.unitName]) dataset[cell.unitName] = {};
			dataset[cell.unitName][cell.timestamp] = {
				value: unitState.data?.[previousTime]?.value,
				user: 'gavinasay',
				inputTime: dayjs().format('HH:mm:ss.SSS'),
			};
			return dataset;
		}, {});

		dispatch(updateData(newData));
		dispatch(shiftToRecent());

		window.timeDropdownHide = setTimeout(() => {
			dispatch(updateDropdownTime(''));
			dispatch(updateRecentlySelected([]));
		}, 5000);
	}

	return (
		<TimeDropdownMenu timeDropdownOffset={timeDropdownOffset}>
			<MenuItem onClick={repeat}>Repeat last check</MenuItem>
		</TimeDropdownMenu>
	);
}

export default TimeDropdown;
