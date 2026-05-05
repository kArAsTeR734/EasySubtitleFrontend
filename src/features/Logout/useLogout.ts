import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthorizationService.logout(),
    onSuccess: () => {
      console.log('Logged out successfully');
      queryClient.removeQueries({ queryKey: ['tasks'] });
      queryClient.removeQueries({ queryKey: ['me'] });
      localStorage.removeItem('access_token');

      navigate('/');
      window.location.reload();
    },
    onError: (error) => {
      console.log('Произошла ошибка при выходе из аккаунта', error);
    },
  });
};