import type {GetAllTranscriptionsResult} from "../../api/types/api-types.ts";
import {TranscriptionService} from "../../api/TranscriptionService.ts";

export const getAllTranscriptions = async (page:number,pageSize:number):Promise<GetAllTranscriptionsResult> => {
  return await TranscriptionService.getAllTranscriptions(page,pageSize);
}