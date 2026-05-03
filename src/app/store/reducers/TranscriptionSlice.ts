import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileData } from '@/api/types/api-types.ts';

export interface TranscriptionState {
  files: FileData[];
  selectedFile: FileData | null;
}

const initialState: TranscriptionState = {
  files: [],
  selectedFile: null,
};

export const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<FileData>) => {
      state.selectedFile = action.payload;
    },

    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
  },
});

export default transcriptionSlice.reducer;
