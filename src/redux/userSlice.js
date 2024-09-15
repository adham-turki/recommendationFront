import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'users/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const activateUser = createAsyncThunk(
  'users/activateUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/user/activate/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to activate user');
      }

      return userId; // Return userId to identify which user was activated
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deactivateUser = createAsyncThunk(
  'users/deactivateUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/user/deactivate/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to deactivate user');
      }

      return userId; // Return userId to identify which user was deactivated
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  user: null, // For storing the fetched user data
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
    logout(state) {
      // Clear user data and reset loading/error states
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        const userId = action.payload;
        if (state.user) {
          // Assuming userList is an array of users
          const user = state.user.find(user => user.id === userId);
          if (user) {
            user.enabled = true;
          }
        }
        state.loading = false;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deactivateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const userId = action.payload;
        if (state.user) {
          const user = state.user.find(user => user.id === userId);
          if (user) {
            user.enabled = false;
          }
        }
        state.loading = false;
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUser, logout } = userSlice.actions;

export default userSlice.reducer;
