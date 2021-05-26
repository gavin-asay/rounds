import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
	name: 'config',
	initialState: {
		shiftStart: '2200',
		shiftEnd: '0700',
		area: null,
	},
	reducers: {
		setShift: (state, action) => {
			state.shiftStart = action.payload.shiftStart || state.shiftStart;
			state.shiftEnd = action.payload.shiftEnd || state.shiftEnd;
		},
		setArea: (state, action) => {
			state.area = action.payload;
		},
	},
});

export const { setShift, setArea } = configSlice.actions;

export default configSlice.reducer;
