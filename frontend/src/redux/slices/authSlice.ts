import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import * as authService from '../../services/auth.service';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { username: string; email: string; password: string }) => {
    const response = await authService.signup(userData.username, userData.email, userData.password);
    return response.access_token;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { username: string; password: string }) => {
    const response = await authService.login(userData.username, userData.password);
    return response.access_token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export default authSlice.reducer;
