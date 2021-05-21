import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers';

export default configureStore({
	reducer: {
		config: configReducer,
	},
});
