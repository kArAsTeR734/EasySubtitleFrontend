import type { GetAllTasksResponse } from '@/api/types/api-types.ts';
import { TasksService } from '@/api/services/TasksService.ts';

export const getAllTasks = async (
  limit?: number,
  offset?: number,
  sort?: 'name' | 'status' | 'created_at',
  order?: 'asc' | 'desc'
): Promise<GetAllTasksResponse> => {
  return await TasksService.getAllTasks(
    limit,
    offset,
    sort,
    order
  );
};