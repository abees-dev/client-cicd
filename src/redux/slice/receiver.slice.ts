import { createSlice } from '@reduxjs/toolkit';
import { User } from 'src/generated/graphql';

export interface ModalState {
  user: Partial<User>;
}

const initialState: ModalState = {
  user: {},
};

export const receiverSlice = createSlice({
  name: 'receiver',
  initialState,
  reducers: {
    setReceiver: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setReceiver } = receiverSlice.actions;

export default receiverSlice.reducer;
