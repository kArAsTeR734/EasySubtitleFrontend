import type {TranscriptionTimestamp} from "../../shared/types/transcriptions.ts";

interface TranscriptionResultInterface {
  scripts: TranscriptionTimestamp[],
  count: number
}

interface RegistrationRequestDataInterface {
  login: string,
  password: string,
  passwordConfirmed: string
}

interface LoginReturnDataInterface {
  accessToken: string,
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

export type TranscriptionResult = TranscriptionResultInterface;

export type GetAllTranscriptionsResult = GetAllTranscriptionsInterface;

export type LoginRequestData = Omit<RegistrationRequestData, 'passwordConfirmed'>

export type LoginReturnData = LoginReturnDataInterface;

export type RegistrationRequestData = RegistrationRequestDataInterface;
