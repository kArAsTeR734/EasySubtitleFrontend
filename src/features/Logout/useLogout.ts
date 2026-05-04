import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';

export const useLogout = () => {
  const queryClient = useQueryClient();

  console.log('token before logout: ', localStorage.getItem('access_token'));

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthorizationService.logout(),
    onSuccess: () => {
      console.log('Logged out successfully');
      queryClient.removeQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries({ queryKey: ['me'] });
      localStorage.removeItem('access_token');

      window.location.reload();
    },
    onError: (error) => {
      console.log('Произошла ошибка при выходе из аккаунта', error);
    },
    onSettled: () => {
      console.log('Запрос отправился');
      console.log('token after logout: ', localStorage.getItem('access_token'));
    }
  });
};