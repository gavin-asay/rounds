import { configureStore } from '@reduxjs/toolkit';
import configReducer from './configReducer';
import unitReducer from './unitReducer';
import gridReducer from './gridReducer';

export default configureStore({
	reducer: {
		config: configReducer,
		grid: gridReducer,
		units: unitReducer,
	},
});
