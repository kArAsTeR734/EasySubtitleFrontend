import type {UploadResponse} from "../shared/types/types.ts";
import {TranscriptionInstance} from "../api/config/api.config.ts";

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  console.log('🔍 Диагностика отправки файла:');
  console.log('- URL:', 'http://localhost:8080/api/v1/scripts');
  console.log('- Размер файла:', (file.size / 1024 / 1024).toFixed(2), 'MB');
  console.log('- Тип файла:', file.type);

  const formData = new FormData();
  formData.append('file', file);

  console.log('- FormData keys:');
  for (const [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value);
  }

  try {
    const response = await TranscriptionInstance.post<UploadResponse>('/api/v1/scripts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000,
    });

    console.log('✅ Успешный ответ:', response.status);
    return response.data;

  } catch (error: unknown) {
    if(error instanceof Error){
      console.error('❌ Ошибка:', {
        message: error.message,
      });
    }

    throw error;
  }
};