import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {FileData} from "../../../api/types/api-types.ts";

interface TranscriptionState {
  files: FileData[];
  currentFileId: string | null;
  processingFiles: string[];
  selectedFileId: string | null;
}

const initialState: TranscriptionState = {
  files: [],
  currentFileId: null,
  processingFiles: [],
  selectedFileId: null
};

export const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setUploadedFiles: (state, action: PayloadAction<FileData[]>) => {
      state.files = action.payload;
    },

    addFile: (state, action: PayloadAction<FileData>) => {
      state.files.push(action.payload);
    },

    setSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.selectedFileId = action.payload;
    },

    setCurrentFile: (state, action: PayloadAction<string | null>) => {
      state.currentFileId = action.payload;
    },

    addProcessingFile: (state, action: PayloadAction<string>) => {
      if (!state.processingFiles.includes(action.payload)) {
        state.processingFiles.push(action.payload);
      }
    },

    removeProcessingFile: (state, action: PayloadAction<string>) => {
      state.processingFiles = state.processingFiles.filter(id => id !== action.payload);
    },
  }
});

export default transcriptionSlice.reducer;
