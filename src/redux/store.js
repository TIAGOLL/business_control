import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slices/loading';
import pageReducer from './slices/activePage';

export default configureStore({
  reducer: {
    loading: loadingSlice,
    page: pageReducer,
  },
});
