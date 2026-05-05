import { TasksService } from '@/api/services/TasksService.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TaskCreateRequestData } from '@/entities/Task/models/types.ts';

export const useCreateTask = async (
  req: TaskCreateRequestData,
  functionsFile?: File,
  configFile?: File,
  dataFile?: File,
  checkpointFile?: File
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTask'],
    mutationFn: () => TasksService.createTask(
      req,
      functionsFile,
      configFile,
      dataFile,
      checkpointFile
    ),
    onSuccess: () => {
      console.log('Create task successfully');
      queryClient.removeQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.log('Произошла ошибка при создании задачи из аккаунта', error);
    },
    onSettled: () => {
      console.log('Запрос отправился');

      window.location.reload();
    }
  });
};