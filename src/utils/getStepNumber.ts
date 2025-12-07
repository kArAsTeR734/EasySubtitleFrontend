import type { TranscriptionSteps } from '../shared/types/types.ts';

export const getStepNumber = (step: TranscriptionSteps): number => {
  switch (step) {
    case 'upload':
      return 1;
    case 'processing':
      return 2;
    case 'result':
      return 3;
    default:
      return 1;
  }
};
