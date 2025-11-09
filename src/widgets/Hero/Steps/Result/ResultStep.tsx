import type {StepProps} from "../../../../shared/types/types.ts";
import type {FC} from "react";
import {formatTime} from "../../../../utils/formatTime.ts";

export const ResultStep:FC<StepProps> = ({processingResult}) => {
  if (!processingResult) {
    return <div>Нет данных для отображения</div>;
  }

  return (
      <div className="results-step">
        <div className="results-step__timestamps">
          <h3>Таймкоды:</h3>
          {processingResult.timestamps.map((timestamp, index) => (
              <div key={index} className="timestamp-item">
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

