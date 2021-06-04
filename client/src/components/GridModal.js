import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../utils/unitReducer';
import { updateSelectedCells, shiftToRecent, updateRecentlySelected, toggleModal } from '../utils/gridReducer';

import dayjs from 'dayjs';

import { modalColor } from '../utils/helpers';

let keyInput = '';
function useKeydown(validCodes, modalVisible, cb) {
	// using event listeners on document is tricky
	// you run the risk of adding a duplicate listener on every re-render, and you get huge slowdowns
	const callbackRef = useRef(cb);

	useEffect(() => {
		// refresh the callback to avoid stale data
		callbackRef.current = cb;
	}, [cb]);

	useEffect(() => {
		function keyCheck(e) {
			if (!modalVisible) return;
			if (e.metaKey || e.ctrlKey) return;

			if (e.key === 'Backspace' || e.key === 'Delete') {
				window.clearTimeout(window.modalHide);
				cb(e, e.key);
			}

			// we check a handful of cases and evaluate the validity of recent input across multiple event firings
			if (keyInput.length === 0 && validCodes.test(e.key.toUpperCase())) keyInput += e.key.toUpperCase();
			else if (keyInput.length === 1 && validCodes.test(keyInput + e.key.toUpperCase()))
				keyInput += e.key.toUpperCase();
			else if (keyInput.length === 1 && !validCodes.test(keyInput + e.key.toUpperCase()))
				keyInput = e.key.toUpperCase();
			else if (keyInput.length === 2 && validCodes.test(e.key.toUpperCase())) {
				keyInput = '';
				keyInput += e.key.toUpperCase();
			}

			window.clearTimeout(window.modalHide);
			// later we'll see that cb is gridInputHandler(), which also handles click events on the modal
			cb(e, keyInput);
		} // listener is added when this component is mounted/rendered
		document.addEventListener('keydown', keyCheck);
		// listener is removed when this component is unmounted/unrendered
		return () => {
			document.removeEventListener('keydown', keyCheck);
		};
	});
}

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

	// const hiddenInput = useRef(null);
	// let [keyInput, setKeyInput] = useState('');

	function clearModal() {
		dispatch(toggleModal(false));
		dispatch(updateSelectedCells([]));
	}

	function gridInputHandler(e, value = e.target.textContent) {
		console.log(e);
		if (window.modalHide) window.clearTimeout(window.modalHide);
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
			keyInput = '';
		}, 5000);
	}

	useKeydown(validCodes, modalVisible, gridInputHandler);

	return (
		<ModalFrame modalOffset={modalOffset} modalVisible={modalVisible}>
			<button className='close' onClick={clearModal}>
				X
			</button>
			<InputModal>
				<div className='modal-info'></div>
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
