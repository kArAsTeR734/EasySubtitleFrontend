import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'auth' | 'createTask' | null;

export interface ModalSliceState {
  activeModal: ModalType;
  title: string;
}

const initialState: ModalSliceState = {
  activeModal: null,
  title: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.activeModal = action.payload;
    },

    closeModal(state) {
      state.activeModal = null;
    },

    switchAuthMode(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export default modalSlice.reducer;
