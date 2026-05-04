export interface FileData {
  data: string;
  text: string;
  id: string;
  filename: string;
  uploadTime: string;
}

export interface GetAllTranscriptionsResult {
}

export interface TranscriptionResult {
}

export interface UploadResponse {
  id: string;
}

export interface UploadResponse {
}

export interface TaskResponse {
  id: string;
  name: string;
  description?: string;
  mode: string;
  status: string;
  error?: string;
  created_at: string;
}

export interface GetAllTasksResponse {
  tasks: TaskResponse[];
}