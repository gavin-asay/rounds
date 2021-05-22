import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers';
import unitReducer from './unitReducer';

export default configureStore({
	reducer: {
		config: configReducer,
		units: unitReducer,
	},
});
