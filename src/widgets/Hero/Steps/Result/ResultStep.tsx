import type {GetTranscriptionResult, StepProps} from "../../../../shared/types/types.ts";
import {formatTime} from "../../../../utils/formatTime.ts";
import {getTranscription} from "../../../../features/GetTranscription.ts";
import {type FC, useEffect, useState} from "react";
import useFetching from "../../../../shared/hooks/useFetching.ts";

interface ResultStepProps extends StepProps{
  fileId: string | null
}

export const ResultStep: FC<ResultStepProps> = ({fileId,processingResult}) => {

  const [timestamps, setTimestamps] = useState<GetTranscriptionResult | null>(null);
  //const [script, setScript] = useState<GetTranscriptionResult | null>(null);
  const {
    error: transcriptionError,
    fetching: fetchTranscription
  } = useFetching<GetTranscriptionResult, [string]>(getTranscription, {
    onSuccess: (data) => {
      console.log('Транскрипция получена:', data.scripts);
      setTimestamps(data);
    },
    onError: (error) => {
      console.error('Ошибка получения транскрипции:', error);
    },
  });

  useEffect(() => {
    if (fileId) {
      fetchTranscription(fileId);
    }
  }, [fileId, fetchTranscription]);

  if (!processingResult) {
    return <h1>Нет данных для отображения</h1>;
  }

  if(transcriptionError){
    return <h1>Возникла непредвиденная ошибка</h1>
  }

  return (
      <div className="results-step">
        <div className="results-step__timestamps">
          <h3>Таймкоды:</h3>
          {timestamps?.scripts.map((timestamp, index) => (
              <div key={`${timestamp.start}-${index}`} className="timestamp-item">
                <span className="timestamp-time">
                  {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                </span>
                <p className="timestamp-text">{timestamp.text}</p>
              </div>
          ))}
        </div>

        <div className="results-step__summary">
          <h3>Краткое содержание:</h3>
          <p>{processingResult.summary}</p>
        </div>
      </div>
  );
};

