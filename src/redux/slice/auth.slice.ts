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

export const userLoginThunk = createAsyncThunk('auth/login', async (params: LoginInput) => {
  return await userLogin(params);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    useLogout: (state) => {
      state.accessToken = undefined;
      state.isAuthenticated = undefined;
      state.user = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.accessToken;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
