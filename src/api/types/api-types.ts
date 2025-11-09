import type {TranscriptionTimestamp} from "../../shared/types/transcriptions.ts";

interface TranscriptionResultInterface{
  scripts:TranscriptionTimestamp[],
  count:number
}

interface TranscriptionIdInterface{
  id:string
}

export type TranscriptionResult = TranscriptionResultInterface;

export type TranscriptionId = TranscriptionIdInterface;