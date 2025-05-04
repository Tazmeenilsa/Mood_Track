import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import checkInReducer from './slices/checkInSlice'
import moodReducer from './slices/moodSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    checkIn: checkInReducer,
    mood:moodReducer

  },
});
export default store