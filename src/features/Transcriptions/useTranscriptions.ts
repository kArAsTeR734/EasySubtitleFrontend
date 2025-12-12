import {useQuery} from "@tanstack/react-query";
import {TranscriptionService} from "../../api/TranscriptionService.ts";

export const useTranscriptions = (id:number) => {
  return useQuery({
    queryKey:['userMe',id],
    queryFn:TranscriptionService.getTranscriptionResult(id),
    enabled: !!localStorage.getItem('access_token'),
    retry: false,
  })
}