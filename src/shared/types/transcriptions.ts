interface TimestampInterface {
  hours: number;
  minutes: number;
  seconds: number;
}

export type Timestamp = TimestampInterface;

interface TranscriptionTimestampInterface {
  start: Timestamp;
  end: Timestamp;
  text: string;
}

export type TranscriptionTimestamp = TranscriptionTimestampInterface;

interface TranscriptionResultInterface {
  timestamps: TranscriptionTimestamp[];
  summary: string;
  duration?: number;
}

export type TranscriptionResult = TranscriptionResultInterface;
