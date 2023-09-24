import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
  },
  reducers: {
    HanddleLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});


export const { HanddleLoading } = slice.actions;

export const isLoading = state => state.loading;

export default slice.reducer;