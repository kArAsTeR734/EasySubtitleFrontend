import type { StepProps, } from '@shared/types/types.ts';
import { formatTime, parseTimestamps } from '@utils/formatTime.ts';
import { type FC, useMemo, useState } from 'react';
import { useTranscriptions } from '@/features/Transcriptions/useTranscriptions.ts';

export interface ResultStepProps extends StepProps {
  fileId: string | null;
}

export const ResultStep: FC<ResultStepProps> = ({
  fileId,
  selectedFile,
}) => {

  const {
    data:transcriptionData,
    error:transcriptionError,
    isError:isTranscriptionError,
    refetch:refetchTranscription,
    isLoading:isTranscriptionLoading
  } = useTranscriptions(fileId);

  const selectedFileCheck= () => {
    if(!selectedFile && !isTranscriptionLoading){
      const timestampArray = transcriptionData?.scripts;

    }
    parseTimestamps(selectedFile?.text || '');
  }

  const handleRefresh = () => {
    refetchTranscription();
  }

  if (isTranscriptionLoading) {
    return <div>Загрузка транскрипции...</div>;
  }

  if (isTranscriptionError) {
    return (
      <div>
        Ошибка: {transcriptionError.message}
        <button onClick={handleRefresh}>Повторить</button>
      </div>
    );
  }

  return (
    <div className="results-step">
      {selectedFile && (
        <div className="file-info">
          <h4>Файл: {selectedFile.filename}</h4>
          <p>Загружен: {selectedFile.uploadTime}</p>
        </div>
      )}

      <div className="results-step__timestamps">
        <h3>Таймкоды:</h3>
        {parseTimestamps(selectedFile?.text || '')
          .map((timestamp, index) => {
            if (!timestamp || !timestamp.start || !timestamp.end) {
              return null;
            }
            return (
              <div
                key={`${timestamp.start}-${index}`}
                className="timestamp-item"
              >
                <span className="timestamp-time">
                  {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                </span>
                <p className="timestamp-text">{timestamp.text}</p>
              </div>
            );
          })
          .filter(Boolean)}
      </div>

      <div className="results-step__summary">
        <h3>Краткое содержание:</h3>
      </div>
    </div>
  );
};
