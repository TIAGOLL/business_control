import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/activePage';

export default configureStore({
  reducer: {
    page: pageReducer,
  },
});
