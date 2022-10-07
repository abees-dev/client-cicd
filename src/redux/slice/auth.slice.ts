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
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, profile: action.payload } as User;
    },
    updateAvatarRedux: (state, action) => {
      state.user = { ...state.user, avatar: action.payload } as User;
    },
  },
});

export const { useLogout, refreshToken, loginSuccess, updateUser, updateProfile, updateAvatarRedux } =
  userSlice.actions;

export default userSlice.reducer;
