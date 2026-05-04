import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService.ts';

export const useInitializeUser = () => {
  const token = localStorage.getItem('access_token');

  return useQuery({
    queryKey: ['me'],
    queryFn: UserService.getUserInfo,
    enabled: !!token,
    retry: false,
    staleTime: 15 * 60 * 1000,
  });
};
