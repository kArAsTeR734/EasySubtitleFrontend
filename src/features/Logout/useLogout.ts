import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthorizationService.logout(),
    onSuccess: () => {
      console.log('Logged out successfully');
      queryClient.removeQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries({ queryKey: ['me'] });
      localStorage.removeItem('access_token');
    },
    onError: (error) => {
      console.log("Произошла ошибка при выходе из аккаунта", error);
    },
    onSettled: () => {
      console.log('Запрос отправился');
    }
  });
};