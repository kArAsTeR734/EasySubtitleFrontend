import './TranscriptionWorkspace.scss'
import {useState} from "react";
import type {TranscriptionSteps, UploadResponse} from "../../shared/types/types.ts";
import StepNavigation from "../../shared/components/StepNavigation";
import {getStepNumber} from "../../utils/getStepNumber.ts";
import type {TranscriptionResult} from "../../shared/types/transcriptions.ts";
import {stepConfig} from "../../shared/config/stepConfig.ts";
import {useFetching} from "../../shared/hooks/useFetching.ts";
import {uploadFile} from "../../features/FileUpload.ts";

export const TranscriptionWorkspace = () => {
  const [currentStep, setCurrentStep] = useState<TranscriptionSteps>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingResult, setProcessingResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string>('');

  const {isLoading: isUploading, error: uploadError, fetching: uploadFileFetching}
      = useFetching<UploadResponse, [File]>(uploadFile, {
    onSuccess: (data) => console.log('Файл загружен:', data.id),
    onError: (error) => console.error('Ошибка загрузки:', error),
  });

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setError(uploadError);
    await uploadFileFetching(file);
  };

  /*
  const simulateProcessing = async () => {
    try {
      setTimeout(() => {
        const mockResult = {
          timestamps: [
            { start: 0, end: 30, text: "Первая часть текста" },
            { start: 30, end: 60, text: "Вторая часть текста" }
          ],
          summary: "Краткое содержание текста..."
        };
        setProcessingResult(mockResult);
        setCurrentStep('result');
      }, 3000);
    } catch (error) {
      console.error('Ошибка обработки:', error);
    }
  };
  */
  const handleNext = () => {
    if (currentStep === 'upload' && uploadedFile) {
      setCurrentStep('processing');
    }
  };

  const handleBack = () => {
    if (currentStep === 'result') {
      setCurrentStep('upload');
      setUploadedFile(null);
      setProcessingResult(null);
    } else if (currentStep === 'processing') {
      setCurrentStep('upload');
    }
  };

  const { component: StepComponent, title, showNavigation } = stepConfig[currentStep];

  const isNextDisabled =
      (currentStep === 'upload' && (!uploadedFile || isUploading || !!uploadError)) ||
      (currentStep === 'processing' && isUploading);

  return (
      <section className="hero">
        <div className="hero--inner container">
          <h2 className="hero__title h3">{title}</h2>

          {isUploading && <div>Загрузка файла...</div>}

          {uploadError && (
                  <div className="error-message">
                    {error}
                    <button>Перезагрузить страницу</button>
                  </div>
              )
          }
          <StepComponent
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              processingResult={processingResult}
              error={error}
              isLoading={isUploading}
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

