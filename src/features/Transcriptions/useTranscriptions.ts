import { useQuery } from '@tanstack/react-query';
import { TranscriptionService } from '@/api/services/TranscriptionService.ts';

export const useTranscriptions = (id: string | null) => {
  return useQuery({
    queryKey: ['transcription', id],
    queryFn: async () => TranscriptionService.getTranscriptionResult(id ?? ''),
    enabled: !!id,
    retry: false,
  });
};
