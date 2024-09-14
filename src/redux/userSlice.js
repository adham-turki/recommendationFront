// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // For storing a list of users
  userData: null, // For storing a single user's data
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleUserStatus(state, action) {
      const { userId, isEnabled } = action.payload;
      state.users = state.users.map(user =>
        user.id === userId ? { ...user, enabled: !isEnabled } : user
      );
    },
    // New actions for single user data
    setUser(state, action) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  toggleUserStatus,
  setUser,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
