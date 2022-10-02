import { createSlice } from '@reduxjs/toolkit';
import { User } from 'src/generated/graphql';

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

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    useLogout: (state) => {
      state.accessToken = undefined;
      state.isAuthenticated = undefined;
      state.user = undefined;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { useLogout, refreshToken, loginSuccess } = userSlice.actions;

export default userSlice.reducer;
