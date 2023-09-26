import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slices/loading';

export default configureStore({
  reducer: {
    loading: loadingSlice,
  },
});
