import type {TranscriptionTimestamp} from "../../shared/types/transcriptions.ts";

interface TranscriptionResultInterface {
  scripts: TranscriptionTimestamp[],
  count: number
}

interface TranscriptionIdInterface {
  id: string
}

export interface FileData{
  id:number,
  timeOfUpload:string,
  text:string | null
}

interface GetAllTranscriptionsInterface{
  data:FileData[],
  total:number
}

export type TranscriptionResult = TranscriptionResultInterface;

export type TranscriptionId = TranscriptionIdInterface;

export type GetAllTranscriptionsResult = GetAllTranscriptionsInterface;