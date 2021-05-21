import React from 'react';
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
		console.log(timestamps[i]);
		if (timestamps[timestamps.length - 1] === shiftEnd) break;
		i++;
	}

	return (
		<StyledSubgrid checks={timestamps.length}>
			{timestamps.map(time => (
				<GridTimestamp key={time}>{time}</GridTimestamp>
			))}
		</StyledSubgrid>
	);
}

export default Subgrid;
