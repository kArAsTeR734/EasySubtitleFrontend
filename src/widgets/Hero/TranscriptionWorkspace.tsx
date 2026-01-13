import './TranscriptionWorkspace.scss';
import StepNavigation from '../../shared/components/StepNavigation';
import { stepConfig } from '@shared/config/stepConfig.ts';
import { getStepNumber } from '@utils/getStepNumber.ts';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { transcriptionSlice } from '@app/store/reducers/TranscriptionSlice.ts';
import { useFileUpload } from '@/features/Transcriptions/useFileUpload.ts';
import { getStepComponent } from '@utils/getPageSteps.ts';
import { useMemo } from 'react';

export const TranscriptionWorkspace = () => {
  const { selectedFile, currentStep } = useAppSelector(
    (state) => state.transcriptionReducer,
  );
  const { setCurrentStep, clearSelectedFile } = transcriptionSlice.actions;
  const dispatch = useAppDispatch();

  const {
    uploadedFile,
    setUploadedFile,
    uploadFile,
    isUploading,
    fileId,
    error
  } = useFileUpload();

  const handleNext = () => {
    if (currentStep === 'upload' && uploadedFile) {
      dispatch(setCurrentStep('processing'));
    }
  };

  const handleBack = () => {
    if (currentStep === 'result') {
      dispatch(setCurrentStep('upload'));
      dispatch(clearSelectedFile());
      setUploadedFile(null);
    } else if (currentStep === 'processing') {
      dispatch(setCurrentStep('upload'));
    }
  };

  const StepComponent = useMemo(
    () => getStepComponent(selectedFile, currentStep),
    [selectedFile, currentStep]
  );

  const stepInfo = useMemo(
    () => stepConfig[currentStep] || { title: '', showNavigation: false },
    [currentStep]
  );

  const { title, showNavigation } = stepInfo;

  const isNextDisabled =
    (currentStep === 'upload' &&
      (!uploadedFile || isUploading || !!error)) ||
    (currentStep === 'processing' && isUploading);

  return (
    <section className="hero">
      <div className="hero--inner container">
        <h2 className="hero__title h3">{title}</h2>

        {isUploading && <div>Загрузка файла...</div>}

        {error && (
          <div className="error-message">
            {error.message}
            <button>Перезагрузить страницу</button>
          </div>
        )}
        <StepComponent
          onFileUpload={uploadFile}
          uploadedFile={uploadedFile}
          error={error?.message}
          isLoading={isUploading}
          fileId={fileId}
          selectedFile={selectedFile}
        />

        {showNavigation && (
          <StepNavigation
            currentStep={getStepNumber(currentStep)}
            totalSteps={3}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={isNextDisabled}
            backDisabled={isUploading}
            className="transcription-workspace__navigation"
          />
        )}
      </div>
    </section>
  );
};
