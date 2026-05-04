import { api, apiFiles } from '../config/api.config.ts';
import type { GetAllTasksResponse, TaskResponse } from '@/api/types/api-types.ts';
import type { TaskCreateRequestData } from '@/entities/Task/models/types.ts';

export class TasksService {
  public static async getAllTasks(
    limit: number = 30,
    offset: number = 0,
    sort: 'name' | 'status' | 'created_at' = 'created_at',
    order: string = 'DESC'
  ): Promise<GetAllTasksResponse> {
    const response = await api.get('tasks', {
      params: {
        limit: limit,
        offset: offset,
        sort: sort,
        order: order
      }
    });
    return response.data;
  }

  public static async createTask(
    requestData: TaskCreateRequestData,
    functionsFile: File | null,
    configFile: File | null,
    dataFile: File | null,
    checkpointFile: File | null
  ): Promise<TaskResponse> {
    const formData = new FormData();

    formData.append('data', JSON.stringify(requestData));

    if (functionsFile) formData.append('functions.py', functionsFile);
    if (configFile) formData.append('config.yaml', configFile);
    if (dataFile) formData.append('data.mat', dataFile);
    if (checkpointFile) formData.append('checkpoint.ckpt', checkpointFile);

    const response = await apiFiles.post<TaskResponse>('tasks', {
      formData
    });
    return response.data;
  }

  public static async getPlot(id: string): Promise<Blob> {
    const response = await api.get(`tasks/${id}/plot`, {
      responseType: 'blob'
    });
    return response.data;
  }

  public static async downloadResults(
    id: string,
    type: 'data' | 'output'
  ): Promise<Blob> {
    const response = await api.get(`tasks/${id}/download`, {
      responseType: 'blob',
      params: {
        type: type
      }
    });

    return response.data;
  }

  public static async deleteTaskByID(
    id: string
  ): Promise<void> {
    await api.delete(`tasks/${id}`);
  }

  public static async runTask(
    id: string,
    idempotencyKey?: string
  ): Promise<void> {
    const key = idempotencyKey ?? `${id}-${Date.now()}`;

    await api.post(`tasks/${id}/run`, {}, {
      headers: {
        'X-Idempotency-Key': key
      }
    });
  }
}
