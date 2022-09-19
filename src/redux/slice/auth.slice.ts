import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../../api/auth';
import { User } from '../../types';
import { LoginInput } from '../../types/input';

export interface UserState {
  user?: User;
  isAuthenticated?: boolean;
  accessToken?: string;
}

const initialState: UserState = {
  user: undefined,
  isAuthenticated: undefined,
  accessToken: undefined,
};

export const userLoginThunk = createAsyncThunk('auth/login', async (params: LoginInput, { rejectWithValue }) => {
  try {
    const response = await userLogin(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    useLogout: (state) => {
      state.accessToken = undefined;
      state.isAuthenticated = undefined;
      state.user = undefined;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    });
  },
});

export const { useLogout, refreshToken } = userSlice.actions;

export default userSlice.reducer;
