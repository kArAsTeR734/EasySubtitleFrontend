import type {TranscriptionResult, TranscriptionTimestamp} from "./transcriptions.ts";

const TranscriptionSteps = {
  UPLOAD: 'upload',
  PROCESSING: 'processing',
  RESULT: 'result'
} as const;

export type TranscriptionSteps = typeof TranscriptionSteps[keyof typeof TranscriptionSteps];

interface StepInterface {
  onFileUpload: (file: File) => void,
  uploadedFile?: File | null,
  processingResult?: TranscriptionResult | null,
  error?: string,
  isLoading?: boolean
}

export type StepProps = StepInterface;

export type FetchingCallback<T, Args extends unknown[]> = (...args: Args) => Promise<T>;

export interface UseFetchingResult<T, Args extends unknown[]> {
  isLoading: boolean,
  error: string,
  fetching: (...args: Args) => Promise<T | void>,
  clearError: () => void
}

export interface UseFetchingOptions<T> {
  onSuccess?: (data: T) => void,
  onError?: (error: string) => void
}

interface UploadResponseInterface{
  id: string;
}

interface GetTranscriptionInterface{
  scripts:TranscriptionTimestamp[],
  count:number,
}

export type UploadResponse = UploadResponseInterface;

export type GetTranscriptionResult = GetTranscriptionInterface;

