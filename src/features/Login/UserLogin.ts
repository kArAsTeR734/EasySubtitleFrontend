import { useMutation } from '@tanstack/react-query';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthorizationService.login,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
    },
  });
};
