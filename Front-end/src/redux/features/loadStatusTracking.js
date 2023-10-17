import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const loadData = async () => {
  await axios.get('http://localhost:3030/statustracking')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

export const loadStatusTrackingSlice = createSlice({
  name: 'loadStatusTracking',
  initialState: { ...loadData() },
  reducers: {
    reloadAPI: (state) => {
      state.loadStatusTrackingSlice = loadData();
    },
  },
});

export default loadStatusTrackingSlice.reducer;

export const loadStatusTracking = state => state.loadStatusTracking;

export const { reloadAPI } = loadStatusTrackingSlice.actions;


