import { type FileData } from '@/api/types/api-types.ts';

export const TranscriptionSteps = {
  UPLOAD: 'upload',
  PROCESSING: 'processing',
  RESULT: 'result',
} as const;

export type TranscriptionSteps =
  (typeof TranscriptionSteps)[keyof typeof TranscriptionSteps];

export interface StepInterface {
  onFileUpload: (file: File) => void;
  uploadedFile?: File | null;
  error?: string;
  isLoading?: boolean;
  fileId?: string | null;
  selectedFile?: FileData | null;
}

export type StepProps = StepInterface;

export interface UploadResponseInterface {
  id: string;
}

export type UploadResponse = UploadResponseInterface;
