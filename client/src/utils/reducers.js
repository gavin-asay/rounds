import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const configSlice = createSlice({
	name: 'config',
	initialState: {
		shiftStart: dayjs().hour(22).minute(0),
		shiftEnd: dayjs().hour(7).minute(0),
	},
	reducers: {},
});
