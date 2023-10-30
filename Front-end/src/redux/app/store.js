import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/activePage';
import loadStatusTrackingReducer from '../features/loadStatusTracking';

export default configureStore({
  reducer: {
    page: pageReducer,
    loadStatusTracking: loadStatusTrackingReducer,
  },
});
