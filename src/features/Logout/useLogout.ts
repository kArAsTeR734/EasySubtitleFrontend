import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthorizationService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries({ queryKey: ['me'] });
      localStorage.removeItem('access_token');
    },
    onError: (error) => {
      console.log("Произошла ошибка при выходе из аккаунта", error);
    }
  });
};