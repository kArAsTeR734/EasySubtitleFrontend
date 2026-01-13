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

    onClose(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export default modalSlice.reducer;
