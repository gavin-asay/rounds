import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import {
	updateSelectedCells,
	updateRecentlySelected,
	toggleDeselectMode,
	toggleModal,
	updateDropdownTime,
	updateTimeDropdownOffset,
	updateModalOffset,
} from '../utils/gridReducer';

import GridModal from './GridModal';
import TimeDropdown from './TimeDropDown';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { modalColor } from '../utils/helpers';

dayjs.extend(customParseFormat);

const GridTimestamp = styled.div`
	background-color: lightgray;
	border: 0.5px solid black;
	writing-mode: vertical-lr;
	text-align: center;
	font-size: 1.5rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	div {
		height: min-content;
		width: min-content;
		margin-top: 0.5rem;
	}

	p {
		margin: 0;
		writing-mode: initial;
		text-align: center;
		margin: 0 auto;
		cursor: pointer;
	}
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

const GridItem = styled.div`
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
	color: ${props => modalColor(props)};

	&:hover {
		border: white 2px dotted;
	}

	&.selected {
		border: yellow 2px dashed;
	}

	&.selected:hover {
		border: rgb(245, 199, 26) 1px dashed;
	}
`;

function Subgrid() {
	const shiftStart = useSelector(state => state.config.shiftStart);
	const shiftEnd = useSelector(state => state.config.shiftEnd);
	const units = useSelector(state => state.units);
	const modalVisible = useSelector(state => state.grid.modalVisible);
	const deselectMode = useSelector(state => state.grid.deselectMode);
	const selectedCells = useSelector(state => state.grid.selectedCells);
	const recentlySelected = useSelector(state => state.grid.recentlySelected);
	const dropdownTime = useSelector(state => state.grid.dropdownTime);
	const dispatch = useDispatch();

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

	function gridSelectorMouse(e) {
		e.preventDefault();
		if (e.buttons !== 1 || !e.target.classList.contains('grid-item')) return;
		if (recentlySelected.length) {
			window.clearTimeout(window.modalHide);
			dispatch(updateRecentlySelected([]));
		}

		const { unitName, timestamp } = e.target.dataset;
		const isSelected = selectedCells.find(cell => cell.unitName === unitName && cell.timestamp === timestamp);

		if (isSelected) {
			dispatch(toggleDeselectMode(true));
			dispatch(
				updateSelectedCells(selectedCells.filter(cell => cell.timestamp !== timestamp || cell.unitName !== unitName))
			);
		} else {
			const rect = e.target.getBoundingClientRect();
			const left = window.innerWidth - rect.right < 350 ? e.target.offsetLeft - 165 : e.target.offsetLeft + 110;
			const top = e.target.offsetTop - 50;

			dispatch(updateSelectedCells([...selectedCells, { unitName, timestamp, left, top }]));
			dispatch(toggleDeselectMode(false));
		}
	}

	function gridSelectorTouch(e) {
		if (e.touches.length !== 1 || !e.target.classList.contains('grid-item')) return;
		if (e.target.classList.contains('grid-item')) e.preventDefault();

		if (window.modalHide) {
			window.clearTimeout(window.modalHide);
			dispatch(updateRecentlySelected([]));
		}
		// define target to get the actual position/element under finger
		const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
		const { unitName, timestamp } = target.dataset;
		const isSelected = selectedCells.find(cell => cell.unitName === unitName && cell.timestamp === timestamp);

		if (isSelected && deselectMode) {
			dispatch(
				updateSelectedCells(selectedCells.filter(cell => cell.unitName !== unitName && cell.timestamp !== timestamp))
			);
		} else if (!isSelected && !deselectMode) {
			const rect = target.getBoundingClientRect();
			const left = window.innerWidth - rect.right < 350 ? target.offsetLeft - 165 : target.offsetLeft + 110;
			const top = target.offsetTop - 50;
			dispatch(updateSelectedCells([...selectedCells, { unitName, timestamp, left, top }]));
		}
	}

	function selectToggleMouse(e) {
		e.preventDefault();
		if (e.target.classList.contains('selected')) dispatch(toggleDeselectMode(true));
		gridSelectorMouse(e);
	}

	function selectToggleTouch(e) {
		if (!e.target.classList.contains('grid-item') || e.touches.length > 1) return;
		e.preventDefault();
		if (document.elementsFromPoint(e.clientX, e.clientY).classList.contains('selected'))
			dispatch(toggleDeselectMode(true));
		gridSelectorTouch(e);
	}

	function renderInputModal(e) {
		if (modalVisible || e.target.dataset.drop) return;
		dispatch(toggleDeselectMode(false));
		dispatch(toggleModal(true));
		if (!selectedCells.length && !recentlySelected.length) {
			dispatch(toggleModal(false));
			return;
		}
	}

	function renderTimeDropdown(e) {
		const drop = e.target.dataset?.drop;
		if (drop) {
			const rect = e.target.parentElement.getBoundingClientRect();
			const left =
				window.innerWidth - rect.right < 350
					? e.target.parentElement.offsetLeft - 165
					: e.target.parentElement.offsetLeft + 110;
			const timeColumn = dataCells
				.flat()
				.filter(cell => cell.props['data-timestamp'] === drop)
				.map((cell, i) => {
					return {
						unitName: cell.props['data-unit-name'],
						timestamp: cell.props['data-timestamp'],
						top: Math.round(35),
						left,
					};
				});

			console.log(e.target.offsetLeft);
			dispatch(updateSelectedCells([...timeColumn]));
			dispatch(updateTimeDropdownOffset([0, e.target.offsetLeft + 100]));
			dispatch(updateDropdownTime(drop));
		}
	}

	useEffect(() => {
		if (selectedCells.length || recentlySelected.length) {
			const sorted = [...selectedCells].sort((a, b) => b.left - a.left);
			dispatch(updateModalOffset([sorted[0].top, sorted[0].left]));
			dispatch(toggleModal(true));
		} else {
			dispatch(toggleModal(false));
		}

		if (!selectedCells.every(cell => cell.timestamp === selectedCells[0].timestamp)) dispatch(updateDropdownTime(''));
	}, [selectedCells, recentlySelected, dispatch]);

	const dataCells = units.map(({ name, data }) => {
		const cells = [];
		for (let i = 0; i < timestamps.length; i++) {
			const nameCode = name.replace(' ', '');
			cells.push(
				<GridItem
					key={`${nameCode}-${timestamps[i]}`}
					className={`grid-item ${
						(selectedCells.find(cell => cell.unitName === nameCode && cell.timestamp === timestamps[i]) ||
							recentlySelected.find(cell => cell.unitName === nameCode && cell.timestamp === timestamps[i])) &&
						'selected'
					}`}
					data-unit-name={nameCode}
					data-timestamp={timestamps[i]}
					value={data?.[timestamps[i]]?.value}
				>
					{data?.[timestamps[i]]?.value}
				</GridItem>
			);
		}
		return cells;
	});

	return (
		<StyledSubgrid
			checks={timestamps.length}
			onMouseDown={selectToggleMouse}
			onMouseOver={gridSelectorMouse}
			onTouchStart={selectToggleTouch}
			onTouchMove={gridSelectorTouch}
			onTouchEnd={renderInputModal}
			onClick={renderTimeDropdown}
		>
			{dropdownTime && <TimeDropdown />}
			{modalVisible && <GridModal />}
			{timestamps.map(time => (
				<GridTimestamp key={time}>
					<div>{time}</div>
					<p className='material-icons' data-drop={`${time}`}>
						arrow_drop_down
					</p>
				</GridTimestamp>
			))}
			{dataCells}
		</StyledSubgrid>
	);
}

export default Subgrid;
