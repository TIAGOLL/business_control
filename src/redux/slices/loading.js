import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false,
  },
  reducers: {
    HanddleLoading: ({ value }, { payload }) => {
      return value = payload;
    },
  },
});


export const { HanddleLoading } = loadingSlice.actions; // contadorSlice.actions contém todas as actions criadas.

export default loadingSlice.reducer; // aqui está o reducer, que deve ser indexado ao Store

