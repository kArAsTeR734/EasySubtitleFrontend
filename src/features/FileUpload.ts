import type {UploadResponse} from "../shared/types/types.ts";
import {TranscriptionInstance} from "../api/config/api.config.ts";

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await TranscriptionInstance.post<UploadResponse>('/api/v1/scripts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });

  return response.data;
};