import React from 'react';

import { useSelector } from 'react-redux';

function NameList() {
	const units = useSelector(state => state.units);

	return units.map(unit => (
		<>
			<div>{unit.name}</div>
			<div>{unit.location}</div>
		</>
	));
}

export default NameList;
