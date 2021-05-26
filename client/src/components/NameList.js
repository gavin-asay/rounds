import React from 'react';

import { useSelector } from 'react-redux';

function NameList() {
	const units = useSelector(state => state.units);

	return units.map(unit => (
		<React.Fragment key={unit.name}>
			<div key={unit.name}>{unit.name}</div>
			<div key={unit.location}>{unit.location}</div>
		</React.Fragment>
	));
}

export default NameList;
