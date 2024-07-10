import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import * as authService from '../../services/auth.service';

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : { name: '', email: '', id: 0 }, 
};

// Async thunk for user signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { name: string; email: string; password: string }) => {
    const response = await authService.signup(userData.name, userData.email, userData.password);
    return response; 
  }
);

// Async thunk for user login
export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }) => {
    const response = await authService.login(userData.email, userData.password);
    return response; 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for logging out
    logout(state) {
      state.token = null;
      state.user = { name: '', email: '', id: 0 };
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      // Reducer cases for signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('token', action.payload.access_token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Reducer cases for login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('token', action.payload.access_token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
