import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
	name: 'units',
	initialState: [
		{
			id: 1,
			name: 'Unit 01',
			location: 1,
			data: {
				2200: 'S',
			},
		},
		{
			id: 2,
			name: 'Unit 02',
			location: 2,
			data: {},
		},
	],
	reducers: {
		updateLocation: (state, action) => {
			state.find(unit => unit.id === action.payload.id).location = action.payload.location;
		},
		updateData: (state, action) => {
			state.find(unit => unit.id === action.payload.id).data = { ...state.data, ...action.payload };
		},
	},
});

export const { setShift, setArea } = unitSlice.actions;

export default unitSlice.reducer;
