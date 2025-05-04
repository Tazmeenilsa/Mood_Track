import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [],
  };


const moodSlice = createSlice({
  name: 'mood',
 initialState,
  reducers: {
    addMoodEntry: (state, action) => {
      state.history.push({
        date: new Date().toISOString().split('T')[0], // e.g. 2025-05-03
        mood: action.payload,
      });
    },
  },
});

export const { addMoodEntry } = moodSlice.actions;
export default moodSlice.reducer;
