interface TimestampStandard{
  hours:number,
  minutes:number,
  seconds:number,
}

export interface Timestamp {
  start: TimestampStandard;
  end: TimestampStandard;
  text: string;
}

export interface TranscriptionResult {
  timestamps: Timestamp[];
  summary: string;
  duration?: number;
  language?: string;
  confidence?: number;
}