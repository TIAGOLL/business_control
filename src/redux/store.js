import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading';

export default configureStore({
  reducer: {
    loading: loadingReducer,
  },
});