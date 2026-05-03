import type { TranscriptionTimestamp } from '@shared/types/transcriptions.ts';

export interface TranscriptionResultInterface {
  scripts: TranscriptionTimestamp[];
  count: number;
}

export interface RegistrationRequestDataInterface {
  login: string;
  password: string;
  passwordConfirmed: string;
}

export interface LoginReturnDataInterface {
  accessToken: string;
}

export interface Timestamp {
  start: string;
  end: string;
  text: string;
}

export interface FileData {
  id: string;
  filename: string;
  uploadTime: string;
  text: string | null;
}

export interface GetAllTranscriptionsInterface {
  data: FileData[];
  total: number;
}

export interface UserInfo {
  id: string;
  login: string;
}

export interface RefreshResult{
  accessToken: string;
}

export type TranscriptionResult = TranscriptionResultInterface;

export type GetAllTranscriptionsResult = GetAllTranscriptionsInterface;

export type LoginRequestData = Omit<
  RegistrationRequestData,
  'passwordConfirmed'
>;

export type LoginReturnData = LoginReturnDataInterface;

export type RegistrationRequestData = RegistrationRequestDataInterface;

export type RefreshData = RefreshResult;
