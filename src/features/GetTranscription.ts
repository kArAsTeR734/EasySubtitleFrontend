import { TranscriptionService } from '../api/services/TranscriptionService.ts';
import type { TranscriptionResult } from '../api/types/api-types.ts';

export const getTranscription = async (id: string): Promise<TranscriptionResult> => {
  return await TranscriptionService.getTranscriptionResult(id);
};
