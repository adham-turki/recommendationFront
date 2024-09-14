// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';
import userReducer from './userSlice';


export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    users: userReducer,

  },
});
