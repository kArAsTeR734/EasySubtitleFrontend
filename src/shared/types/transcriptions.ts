export interface Timestamp {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResult {
  timestamps: Timestamp[];
  summary: string;
  duration?: number;
  language?: string;
  confidence?: number;
}

export interface ProcessingError {
  code: string;
  message: string;
  details?: unknown;
}