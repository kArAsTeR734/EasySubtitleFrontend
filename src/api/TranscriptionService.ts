import {apiInstance} from "./config/api.config.ts";
import type {GetAllTranscriptionsResult, TranscriptionResult} from "./types/api-types.ts";

export class TranscriptionService {

  public static async getAllTranscriptions(page: number = 1, pageSize: number = 30): Promise<GetAllTranscriptionsResult> {
    const response = await apiInstance.get('/api/v1/scripts', {
      params: {
        page: page,
        pageSize: pageSize
      }
    })
    return response.data;
  }

  public static async getTranscriptionResult(id: string): Promise<TranscriptionResult> {
    const response = await apiInstance.get(`/api/v1/scripts/${id}`);

    return response.data;
  }
}