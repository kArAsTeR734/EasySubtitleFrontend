import ResultStep from '@widgets/Hero/Steps/Result';
import ProcessingStep from '@widgets/Hero/Steps/Processing';
import { stepConfig } from '@shared/config/stepConfig.ts';
import UploadStep from '@widgets/Hero/Steps/Upload';
import type { FileData } from '@/api/types/api-types.ts';
import { TranscriptionSteps } from '@shared/types/types.ts';

export const getStepComponent = (selectedFile: FileData | null, currentStep: TranscriptionSteps) => {
  if (selectedFile?.text) {
    return ResultStep;
  }

  if (selectedFile) {
    return ProcessingStep;
  }

  return stepConfig[currentStep]?.component || UploadStep;
};

