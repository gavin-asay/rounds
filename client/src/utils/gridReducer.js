import { createSlice } from '@reduxjs/toolkit';

export const gridSlice = createSlice({
	name: 'grid',
	initialState: {
		selectedCells: [],
		recentlySelected: [],
		deselectMode: false,
		modalVisible: false,
		modalOffset: [0, 0],
		dropdownVisible: false,
		dropdownOffset: [0, 0],
	},
	reducers: {
		updateSelectedCells: (state, action) => {
			console.log(action.payload);
			state.selectedCells = action.payload;
			const sorted = action.payload.sort((a, b) => b.left - a.left);
			if (sorted.length) state.modalOffset = [sorted[0].top, sorted[0].left];
		},
		shiftToRecent: state => {
			state.recentlySelected = state.selectedCells;
			state.selectedCells = [];
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
		// maybe unnecessary
		updateModalOffset: (state, action) => {
			state.modalOffset = action.payload;
		},
		toggleDropdown: (state, action) => {
			state.dropdownVisible = action.payload;
		},
		updateDropdownOffset: (state, action) => {
			state.dropdownOffset = action.payload;
		},
	},
});

export const {
	updateSelectedCells,
	shiftToRecent,
	updateRecentlySelected,
	toggleDeselectMode,
	toggleModal,
	updateModalOffset,
	toggleDropdown,
	updateDropdownOffset,
} = gridSlice.actions;

export default gridSlice.reducer;
