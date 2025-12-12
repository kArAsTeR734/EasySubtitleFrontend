import type {GetTranscriptionResult, StepProps} from "../../../../shared/types/types.ts";
import {formatTime, parseTimestamps} from "../../../../utils/formatTime.ts";
import {getTranscription} from "../../../../features/Transcriptions/GetTranscription.ts";
import {type FC, useEffect} from "react";
import useFetching from "../../../../shared/hooks/useFetching.ts";

interface ResultStepProps extends StepProps{
  fileId: string | null,
}

export const ResultStep: FC<ResultStepProps> = ({
  fileId,
  processingResult,
  selectedFile,
  }) => {

  const {
    error: transcriptionError,
    fetching: fetchTranscription
  } = useFetching<GetTranscriptionResult, [string]>(getTranscription, {
    onSuccess: (data) => {
      console.log('Транскрипция получена:', data.scripts);
    },
    onError: (error) => {
      console.error('Ошибка получения транскрипции:', error);
    },
  });

  const result = selectedFile?.text
      ? { scripts: selectedFile.text }
      : processingResult;
  useEffect(() => {
    if (fileId) {
      fetchTranscription(fileId);
    }
  }, [fileId, fetchTranscription]);


  if (!result) {
    return <div>Нет данных для отображения</div>;
  }

  if(transcriptionError){
    return <h1>Возникла непредвиденная ошибка</h1>
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
                    <div key={`${timestamp.start}-${index}`} className="timestamp-item">
                      <span className="timestamp-time">
                        {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                      </span>
                      <p className="timestamp-text">{timestamp.text}</p>
                    </div>
                );
              })
              .filter(Boolean)
          }
        </div>

        <div className="results-step__summary">
          <h3>Краткое содержание:</h3>
        </div>
      </div>
  );
};

