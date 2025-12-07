import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/api/UserService.ts';

export const useUser = () => {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: UserService.getUserInfo,
    enabled: !!localStorage.getItem('access_token'),
    retry: false,
  });
};
