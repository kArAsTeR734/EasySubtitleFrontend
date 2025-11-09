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
  const [fileId, setFileId] = useState<string | null>(null);

  const { isLoading: isUploading, error: uploadError, fetching: uploadFileFetching }
      = useFetching<UploadResponse, [File]>(uploadFile, {
    onSuccess: (data) => {
      console.log('Файл загружен, ID:', data.id);
      setFileId(data.id);
    },
    onError: (error) => {
      console.error('Ошибка загрузки:', error);
    },
  });

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    try {
      await simulateProcessing();
      }
    catch (e){
      console.log(e)
    }
  };

  const simulateProcessing = async () => {
    try {
      setTimeout(() => {
        const mockResult = {
          timestamps: [
            { start: {
                hours:0,
                minutes:0,
                seconds:0
              }, end: {
                hours:0,
                minutes:0,
                seconds:30
              },
              text: "Первая часть текста" },
            { start: {
                hours:0,
                minutes: 0,
                seconds: 30
              }, end:{
                hours:0,
                minutes: 1,
                seconds: 0
              },
              text: "Вторая часть текста" }
          ],
          summary: "Краткое содержание текста..."
        };
        setProcessingResult(mockResult);
        setCurrentStep('result');
      }, 5000);
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
                    {uploadError}
                    <button>Перезагрузить страницу</button>
                  </div>
              )
          }
          <StepComponent
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              processingResult={processingResult}
              error={uploadError}
              isLoading={isUploading}
              fileId={fileId}
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

