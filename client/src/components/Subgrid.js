import React, { useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const GridTimestamp = styled.div`
	background-color: lightgray;
	border: 0.5px solid black;
	writing-mode: vertical-lr;
	text-align: center;
	font-size: 1.5em;
	height: 100%;
	box-sizing: border-box;
`;

const StyledSubgrid = styled.section`
	display: grid;
	grid-column-start: 3;
	grid-column-end: -1;
	grid-row-start: 1;
	grid-row-end: -1;
	overflow: scroll;
	border: none;
	justify-content: left;
	position: relative;
	${({ checks }) => `grid-template-columns: repeat(${checks}, 35px);`}
	grid-template-rows: 100px repeat(10, 35px);

	.grid-item {
		text-align: center;
		height: 100%;
		width: 100%;
		font-size: 16px;
		font-weight: bold;
		background-color: #282828;
		border: 0.5px solid black;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}

	.grid-item:hover {
		border: white 2px dotted;
	}
`;

function Subgrid() {
	const shiftStart = useSelector(state => state.config.shiftStart);
	const shiftEnd = useSelector(state => state.config.shiftEnd);
	let timestamps = [];
	let i = 0;

	while (true) {
		timestamps.push(
			dayjs(shiftStart, 'HHmm')
				.add(15 * i, 'minute')
				.format('HHmm')
		);
		if (timestamps[timestamps.length - 1] === shiftEnd) break;
		i++;
	}

	const units = useSelector(state => state.units);

	const [selectedCells, setSelectedCells] = useState([]);

	return (
		<StyledSubgrid checks={timestamps.length}>
			{timestamps.map(time => (
				<GridTimestamp key={time}>{time}</GridTimestamp>
			))}
			{units.map(({ name, data }) => {
				const cells = [];
				for (let i = 0; i < timestamps.length; i++) {
					const nameCode = name.replace(' ', '');
					cells.push(
						<div
							key={`${nameCode}-${timestamps[i]}`}
							className={`grid-item ${data[timestamps[i]] || ''} ${
								selectedCells.includes([nameCode, timestamps[i]]) && 'selected'
							}`}
							data-unit-name={nameCode}
							data-timestamp={timestamps[i]}
						>
							{data?.[timestamps[i]]}
						</div>
					);
				}
				return cells;
			})}
		</StyledSubgrid>
	);
}

export default Subgrid;
