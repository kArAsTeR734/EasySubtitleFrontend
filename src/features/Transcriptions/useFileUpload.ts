import { useMutation} from '@tanstack/react-query';
import { TranscriptionService } from '@/api/services/TranscriptionService.ts';
import { useCallback, useState } from 'react';

export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [fileId, setFileId] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) =>
      TranscriptionService.uploadTranscriptionFile(file),
    onSuccess: (data) => {
      setFileId(data.id);
    },
    onError: (error) => {
      setFileId(null);
      console.log(error)
    },
  });

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    setUploadedFile(file);
    try {
      await uploadMutation.mutateAsync(file);
    } catch (error) {
      throw error;
    }
  }, [uploadMutation]);

  const clear = () => {
    setUploadedFile(null);
    setFileId(null);
    uploadMutation.reset();
  };

  return {
    uploadedFile,
    fileId,

    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,

    uploadFile,
    clear,
    setUploadedFile,
  };
}