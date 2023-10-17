import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/activePage';
import loadStatusTrackingReducer from '../features/loadStatusTracking';
import loadingReducer from '../features/loading';

export default configureStore({
  reducer: {
    loading: loadingReducer,
    page: pageReducer,
    loadStatusTracking: loadStatusTrackingReducer,
  },
});
