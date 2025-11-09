import {TranscriptionInstance} from "./config/api.config.ts";
import type {TranscriptionId, TranscriptionResult} from "./types/api-types.ts";

export class TranscriptionService {

  public static async getTranscriptionResult(id:string):Promise<TranscriptionResult> {
      const response = await TranscriptionInstance.get(`/api/v1/scripts/${id}`);

      return response.data;
  }

  public static async sendTranscriptionFile(file: File): Promise<TranscriptionId> {
    const formData = new FormData();
    formData.append('file', file);

    const request = await TranscriptionInstance.post('/api/v1/scripts', formData);

    return request.data;
  }
}