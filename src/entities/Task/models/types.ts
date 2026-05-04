export interface TaskCreateRequestData {
  name: string,
  mode: 'train' | 'retrain' | 'predict',
  description?: string,
}