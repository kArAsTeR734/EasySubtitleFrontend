import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileData } from '@/api/types/api-types.ts';
import type { TranscriptionSteps } from '@shared/types/types.ts';

export interface TranscriptionState {
  files: FileData[];
  selectedFile: FileData | null;
  currentStep: TranscriptionSteps;
}

const initialState: TranscriptionState = {
  files: [],
  currentStep: 'upload',
  selectedFile: null,
};

export const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<FileData>) => {
      state.selectedFile = action.payload;

      if (action.payload.text) {
        state.currentStep = 'result';
      } else {
        state.currentStep = 'processing';
      }
    },

    setCurrentStep: (state, action: PayloadAction<TranscriptionSteps>) => {
      state.currentStep = action.payload;
    },

    clearSelectedFile: (state) => {
      state.selectedFile = null;
      state.currentStep = 'upload';
    },
  },
});

export default transcriptionSlice.reducer;
