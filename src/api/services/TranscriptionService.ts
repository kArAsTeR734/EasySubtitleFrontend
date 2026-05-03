import { api } from '../config/api.config.ts';
import type {
  GetAllTranscriptionsResult,
  TranscriptionResult,
  UploadResponse,
} from '@/api/types/api-types.ts';

export class TranscriptionService {
  public static async getAllTranscriptions(
    page: number = 1,
    pageSize: number = 30,
  ): Promise<GetAllTranscriptionsResult> {
    const response = await api.get('/api/v1/scripts', {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response.data;
  }

  public static async getTranscriptionResult(
    id: string,
  ): Promise<TranscriptionResult> {
    const response = await api.get(`/api/v1/scripts/${id}`);

    return response.data;
  }

  public static async uploadTranscriptionFile(
    file: File,
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<UploadResponse>(
      '/api/v1/scripts',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  }
}
