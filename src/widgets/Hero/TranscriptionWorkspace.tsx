import './TranscriptionWorkspace.scss'
import {useState} from "react";
import type {TranscriptionSteps} from "../../shared/types/types.ts";
import UploadStep from "./Steps/Upload";
import ProcessingStep from "./Steps/Processing";
import ResultStep from "./Steps/Result";
import StepNavigation from "../../shared/components/StepNavigation";
import {getStepNumber} from "../../utils/getStepNumber.ts";
import type {ProcessingError, TranscriptionResult} from "../../shared/types/transcriptions.ts";

export const TranscriptionWorkspace = () => {
  const [currentStep, setCurrentStep] = useState<TranscriptionSteps>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingResult, setProcessingResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<ProcessingError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stepConfig = {
    upload: {
      component: UploadStep,
      title: 'Превращаем речь в текст — легко, быстро, точно.',
      showNavigation: true,
    },
    processing: {
      component: ProcessingStep,
      title: 'Обрабатываем ваш файл...',
      showNavigation: true,
    },
    result: {
      component: ResultStep,
      title: 'Результат перевода',
      showNavigation: true,
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsLoading(true);
    setError(null);

    simulateProcessing();
  };

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

  return (
      <section className="hero">
        <div className="hero--inner container">
          <h2 className="hero__title h3">{title}</h2>

          {error && (
              <div className="error-message">
                Ошибка: {error.message}
              </div>
          )}

          <StepComponent
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              processingResult={processingResult}
              error={error}
              isLoading={isLoading}
          />

          {showNavigation && (
              <StepNavigation
                  currentStep={getStepNumber(currentStep)}
                  totalSteps={3}
                  onNext={handleNext}
                  onBack={handleBack}
                  nextDisabled={
                      (currentStep === 'upload' && !uploadedFile) ||
                      (currentStep === 'processing' && isLoading)
                  }
                  backDisabled={isLoading}
                  className="transcription-workspace__navigation"
              />
          )}
        </div>
      </section>
  );
};

