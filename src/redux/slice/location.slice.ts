import { createSlice } from '@reduxjs/toolkit';

export interface LocationState {
  path: string;
}

const initialState: LocationState = {
  path: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
