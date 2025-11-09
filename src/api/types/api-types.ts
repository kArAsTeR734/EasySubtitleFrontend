import type {Timestamp} from "../../shared/types/transcriptions.ts";

interface TranslationResultInterface{
  scripts:Timestamp[],
  count:number
}

export type TranslationResult = TranslationResultInterface;