import { TasksService } from '@/api/services/TasksService.ts';
import { useQuery } from '@tanstack/react-query';

// Хук для получения данных для таблицы

export const useGetAllTasks = async (
  limit?: number,
  offset?: number,
  sort?: 'name' | 'status' | 'created_at',
  order?: 'asc' | 'desc'
) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => TasksService.getAllTasks(limit, offset, sort, order),
    staleTime: 5 * 60 * 1000,
  });
};