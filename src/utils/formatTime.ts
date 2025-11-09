import type {Timestamp} from "../shared/types/transcriptions.ts";

export function formatTime(timestamp: Timestamp): string {
  const hours = timestamp.hours;
  const minutes = timestamp.minutes;
  const secs = timestamp.seconds;
  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${secs.toString().padStart(2, '0')}`;
}