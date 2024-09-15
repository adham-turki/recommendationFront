// src/redux/darkModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: localStorage.getItem('darkMode') === 'true', // Convert string to boolean
    
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', state.isDarkMode.toString()); // Convert boolean to string
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      if (action.payload) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
