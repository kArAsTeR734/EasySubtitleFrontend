import {TranscriptionInstance} from "./config/api.config.ts";
import type {TranscriptionResult} from "../shared/types/transcriptions.ts";
import type {TranscriptionId} from "./types/api-types.ts";

export class TranscriptionService {

  public static async getTranscriptionResult(id:number):Promise<TranscriptionResult> {
      const response = await TranscriptionInstance.get(`/api/v1/scripts/${id}`);

      return response.data;
  }

  public static async sendTranscriptionFile(file:File): Promise<TranscriptionId> {
    const request = await TranscriptionInstance.post('/api/v1/scripts', file)

    return request.data;
  }
}