import React from 'react';
import Subgrid from './Subgrid';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 200px 35px 1fr;
	grid-template-rows: 100px repeat(10, 35px);
	background-color: #282828;
	overflow: scroll;

	& > div {
		border: 0.5px solid white;
		/* display: flex; */
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
`;

const GridLabel = styled.div`
	border: 0.5px solid white;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	font-size: 2.5rem;
	${props =>
		props.location &&
		`writing-mode: vertical-lr;
        font-size: 1.3em;`}
`;

function GridContainer() {
	return (
		<Container>
			<GridLabel>Name</GridLabel>
			<GridLabel location>Location</GridLabel>
			<Subgrid />
		</Container>
	);
}

export default GridContainer;
