import type {TranscriptionTimestamp} from "../../shared/types/transcriptions.ts";

interface TranscriptionResultInterface {
  scripts: TranscriptionTimestamp[],
  count: number
}

interface RegistrationRequestDataInterface {
  login: string,
  password: string,
  confirmPassword: string
}

interface RegistrationReturnDataInterface{
  id:string,
  login:string
}

interface LoginReturnDataInterface {
  accessToken: string,
  refreshToken: string
}

interface TranscriptionIdInterface {
  id: string
}

export interface FileData {
  id: string,
  title:string,
  timeOfUpload: string,
  text: string | null
}

interface GetAllTranscriptionsInterface {
  data: FileData[],
  total: number
}

export type TranscriptionResult = TranscriptionResultInterface;

export type TranscriptionId = TranscriptionIdInterface;

export type GetAllTranscriptionsResult = GetAllTranscriptionsInterface;

export type LoginRequestData = Omit<RegistrationRequestData, 'confirmPassword'>

export type LoginReturnData = LoginReturnDataInterface;

export type RegistrationRequestData = RegistrationRequestDataInterface;

export type RegistrationReturnData = RegistrationReturnDataInterface;

export type UserData = RegistrationReturnDataInterface;

export type TranscriptionData = GetAllTranscriptionsInterface;

