// src/redux/checkInSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkInData: null,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setCheckInData: (state, action) => {
      state.checkInData = action.payload;
    },
    clearCheckInData: (state) => {
      state.checkInData = null;
    },
  },
});

export const { setCheckInData, clearCheckInData } = checkInSlice.actions;
export default checkInSlice.reducer;
