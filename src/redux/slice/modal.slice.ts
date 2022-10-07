import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  [key: string]: boolean;
}

const initialState: ModalState = {};

export const modalSlice = createSlice({
  name: 'profile-modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
