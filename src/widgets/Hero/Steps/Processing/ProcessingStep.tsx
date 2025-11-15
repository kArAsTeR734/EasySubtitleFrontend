import type {StepProps} from "../../../../shared/types/types.ts";
import type {FC} from "react";
import './ProcessingStep.scss'

export const ProcessingStep:FC<StepProps> = ({ uploadedFile, isLoading = true }) => {
  return (
      <div className="processing-step">
        <div className="spinner"></div>
        <p>Обрабатываем {uploadedFile?.name}...</p>
        {isLoading && <p className="processing-step__hint">Это может занять несколько минут</p>}
      </div>
  );
};

