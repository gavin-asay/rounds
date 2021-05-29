import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../utils/unitReducer';
import { updateSelectedCells, shiftToRecent, updateRecentlySelected, toggleModal } from '../utils/gridReducer';

import dayjs from 'dayjs';

import { modalColor } from '../utils/helpers';

const ModalFrame = styled.div`
	width: max-content;
	position: absolute;
	box-sizing: border-box;
	${({ modalOffset }) =>
		`top: ${modalOffset[0]}px;
		left: ${modalOffset[1]}px;`}

	.close {
		text-align: center;
		font-size: 1.2rem;
		background-color: #777777;
		border-radius: 10px 10px 0 0;
		color: white;
		padding: 10px 10px 0 10px;
		width: min-content;
		height: min-content;
		border: 0;
		cursor: pointer;
	}
`;

const InputModal = styled.div`
	background-color: #777777;
	border-radius: 0 10px 10px 10px;
	color: white;
	padding: 15px;

	.modal-body {
		display: grid;
		grid-template-columns: 35px 35px;
		grid-auto-rows: 35px;
	}

	#key-input {
		display: none;
	}
`;

const Selector = styled.button`
	font-size: 16px;
	font-weight: bold;
	background-color: #282828;
	border: 0.5px solid black;
	height: 100%;
	width: 100%;
	text-align: center;
	outline: none;
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	color: ${props => modalColor(props)};
`;

function GridModal() {
	const modalVisible = useSelector(state => state.grid.modalVisible);
	const modalOffset = useSelector(state => state.grid.modalOffset);
	const selectedCells = useSelector(state => state.grid.selectedCells);
	const recentlySelected = useSelector(state => state.grid.recentlySelected);
	const validCodes = /^[ABDHIMORSV]{1}$|^SN$|^ST$|^SW$|^NM$|^GT$|^AW$|^ES$/;
	const dispatch = useDispatch();

	const hiddenInput = useRef(null);
	let [keyInput, setKeyInput] = useState('');

	function clearModal() {
		dispatch(toggleModal(false));
		dispatch(updateSelectedCells([]));
	}

	let modalHide;

	function gridInputHandler(e, value = e.key?.toUpperCase() || e.target.textContent) {
		if (modalHide) window.clearTimeout(modalHide);
		if (!value.match(validCodes)) return;

		if (selectedCells.length) {
			const newData = selectedCells.reduce((dataset, cell) => {
				if (!dataset[cell.unitName]) dataset[cell.unitName] = {};
				dataset[cell.unitName][cell.timestamp] = {
					value,
					user: 'gavinasay',
					inputTime: dayjs().format('HH:mm:ss.SSS'),
				};
				return dataset;
			}, {});

			dispatch(updateData(newData));
			dispatch(shiftToRecent());
		} else {
			const revisedData = recentlySelected.reduce((dataset, cell) => {
				if (!dataset[cell.unitName]) dataset[cell.unitName] = {};
				dataset[cell.unitName][cell.timestamp] = {
					value,
					user: 'gavinasay',
					inputTime: dayjs().format('HH:mm:ss.SSS'),
				};
				return dataset;
			}, {});

			dispatch(updateData(revisedData));
		}

		window.modalHide = setTimeout(() => {
			dispatch(updateRecentlySelected([]));
			dispatch(toggleModal(false));
		}, 5000);
	}

	function keydownHandler(e) {
		if (!selectedCells.length && !recentlySelected.length) return;
		if (e.metaKey || e.ctrlKey) return;

		if (e.key.toUpperCase() === 'N') setKeyInput('NM');

		if (keyInput.length === 0 && e.key.toUpperCase().match(validCodes)) setKeyInput(e.key.toUpperCase());
		else if (keyInput.length === 1 && (keyInput + e.key.toUpperCase()).match(validCodes))
			setKeyInput((keyInput += e.key.toUpperCase()));
		else if (keyInput.length === 2 && e.key.toUpperCase().match(validCodes)) {
			setKeyInput(e.key.toUpperCase());
		}

		window.clearTimeout(window.modalHide);
		gridInputHandler(e, keyInput);
	}

	// useEffect(() => {
	// 	if (modalVisible) hiddenInput.current.focus({ preventScroll: true });
	// }, [modalVisible]);

	// useEffect(() => {
	// 	document.addEventListener('keydown', e => {
	// 		if (modalVisible && !document.activeElement.id !== 'key-input')
	// 			hiddenInput.current.focus({ preventScroll: true });
	// 	});
	// }, [modalVisible]);

	return (
		<ModalFrame modalOffset={modalOffset}>
			<button className='close' onClick={clearModal}>
				X
			</button>
			<InputModal>
				<div className='modal-info'>
					<input id='key-input' ref={hiddenInput} value={keyInput} onKeyDown={keydownHandler} />
				</div>
				<div className='modal-body' onClick={gridInputHandler}>
					<Selector value='S'>S</Selector>
					<Selector value='A'>A</Selector>
					<Selector value='R'>R</Selector>
					<Selector value='B'>B</Selector>
					<Selector value='SN'>SN</Selector>
					<Selector value='ST'>ST</Selector>
					<Selector value='GT'>GT</Selector>
					<Selector value='NM'>NM</Selector>
					<Selector value='SW'>SW</Selector>
					<Selector value='D'>D</Selector>
					<Selector value='M'>M</Selector>
					<Selector value='I'>I</Selector>
				</div>
			</InputModal>
		</ModalFrame>
	);
}

export default GridModal;
