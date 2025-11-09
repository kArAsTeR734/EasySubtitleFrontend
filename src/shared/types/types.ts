import React from "react";
import type {ProcessingError, TranscriptionResult} from "./transcriptions.ts";

const TranscriptionSteps = {
  UPLOAD: 'upload',
  PROCESSING: 'processing',
  RESULT: 'result'
} as const;

export type TranscriptionSteps = typeof TranscriptionSteps[keyof typeof TranscriptionSteps];

export interface StepConfig {
  component: React.ComponentType;
  title: string;
  showNavigation?: boolean;
}

export interface StepInterface {
  onFileUpload: (file: File) => void;
  uploadedFile?: File | null;
  processingResult?: TranscriptionResult | null;
  error?: ProcessingError | null;
  isLoading?: boolean;
}

export type StepProps = StepInterface;