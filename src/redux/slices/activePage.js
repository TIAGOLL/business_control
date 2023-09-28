import { createSlice } from '@reduxjs/toolkit';

export const activePage = createSlice({
  name: 'page',
  initialState: {
    page: '/',
  },
  reducers: {
    ChangePage: (state, { payload }) => {
      state.page = payload;
    },
  },
});


export const { ChangePage } = activePage.actions;

export const selectPage = state => state.page;

export default activePage.reducer;
