import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
	name: 'units',
	initialState: [
		{
			id: 1,
			name: 'Unit 01',
			location: 1,
			data: {
				2200: {
					value: 'S',
					user: 'gavinasay',
					inputTime: '',
				},
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
			const newData = Object.entries(action.payload);
			newData.forEach(data => {
				const unit = state.find(item => item.name.replace(' ', '') === data[0]);
				console.log(unit);
				unit.data = Object.assign(unit.data, data[1]);
			});
		},
	},
});

export const { updateLocation, updateData } = unitSlice.actions;

export default unitSlice.reducer;
