import { createSlice } from '@reduxjs/toolkit';

export const gridSlice = createSlice({
	name: 'grid',
	initialState: {
		selectedCells: [],
		recentlySelected: [],
		deselectMode: false,
		modalVisible: false,
		modalOffset: [0, 0],
	},
	reducers: {
		updateSelectedCells: (state, action) => {
			state.selectedCells = action.payload;
			const sorted = action.payload.sort((a, b) => b.left - a.left);
			if (sorted.length) state.modalOffset = [sorted[0].top, sorted[0].left];
		},
		updateRecentlySelected: (state, action) => {
			state.recentlySelected = action.payload;
		},
		toggleDeselectMode: (state, action) => {
			state.deselectMode = action.payload;
		},
		toggleModal: (state, action) => {
			state.modalVisible = action.payload;
		},
		updateModalOffset: (state, action) => {
			state.modalOffset = action.payload;
		},
	},
});

export const { updateSelectedCells, updateRecentlySelected, toggleDeselectMode, toggleModal, updateModalOffset } =
	gridSlice.actions;

export default gridSlice.reducer;
