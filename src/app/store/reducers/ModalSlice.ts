import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ModalSliceState {
  isOpen: boolean;
  title: string;
}

const initialState: ModalSliceState = {
  isOpen: false,
  title: 'Вход',
};

export const modalSlice = createSlice({
  name: 'ModalSlice',
  initialState,
  reducers: {
    switchAuthMode(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
    // openModal(state) {
    //   state.isOpen = true;
    // },
    // closeModal(state) {
    //   state.isOpen = false;
    // }
  },
});

export default modalSlice.reducer;
