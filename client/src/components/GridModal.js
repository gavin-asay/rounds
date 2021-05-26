import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../utils/unitReducer';
import { updateSelectedCells, toggleModal } from '../utils/gridReducer';

function modalColor(props) {
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

const ModalFrame = styled.div`
	display: ${props => (props.modalVisible ? 'block' : 'none')};
	width: max-content;
	position: absolute;
	box-sizing: border-box;
	${({ modalVisible, modalOffset }) =>
		modalVisible &&
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
	const dispatch = useDispatch();

	function clearModal() {
		dispatch(toggleModal(false));
		dispatch(updateSelectedCells([]));
	}

	return (
		<ModalFrame modalVisible={modalVisible} modalOffset={modalOffset}>
			<button className='close' onClick={clearModal}>
				X
			</button>
			<InputModal modalVisible={modalVisible} modalOffset={modalOffset}>
				<div className='modal-info'></div>
				<div className='modal-body'>
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
