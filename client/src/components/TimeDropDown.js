import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedCells, shiftToRecent, updateRecentlySelected, toggleModal } from '../utils/gridReducer';

function TimeDropDown() {
	const unitData = useSelector(state => state.units.map(unit => unit.data));
	const selectedCells = useSelector(state => state.grid.selectedCells);

	function repeat(e) {}

	return (
		<div>
			<p onClick={repeat}>Repeat last check</p>
		</div>
	);
}
