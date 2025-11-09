import type {UploadResponse} from "../shared/types/types.ts";
import {TranscriptionService} from "../api/TranscriptionService.ts";

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  return await TranscriptionService.sendTranscriptionFile(file);
};