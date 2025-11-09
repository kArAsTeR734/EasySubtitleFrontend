import type {Timestamp} from "../../shared/types/transcriptions.ts";

interface TranslationResultInterface{
  scripts:Timestamp[],
  count:number
}

interface TranscriptionIdInterface{
  id:string
}

export type TranslationResult = TranslationResultInterface;

export type TranscriptionId = TranscriptionIdInterface;