import './TranscriptionWorkspace.scss'
import {useState} from "react";
import type {UploadResponse} from "../../shared/types/types.ts";
import StepNavigation from "../../shared/components/StepNavigation";
import type {TranscriptionResult} from "../../shared/types/transcriptions.ts";
import {stepConfig} from "../../shared/config/stepConfig.ts";
import {uploadFile} from "../../features/FileUpload.ts";
import useFetching from "../../shared/hooks/useFetching.ts";
import {getStepNumber} from "../../utils/getStepNumber.ts";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.ts";
import {transcriptionSlice} from "../../app/store/reducers/TranscriptionSlice.ts";
import ResultStep from "./Steps/Result";
import ProcessingStep from "./Steps/Processing";
/*
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
  */
export const TranscriptionWorkspace = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingResult, setProcessingResult] = useState<TranscriptionResult | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const {selectedFile, currentStep} = useAppSelector(state => state.transcriptionReducer);
  const {setCurrentStep, clearSelectedFile} = transcriptionSlice.actions
  const dispatch = useAppDispatch();

  const {isLoading: isUploading, error: uploadError, fetching: uploadFileFetching}
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
    try {
      console.log('Загрузка файлов');
      setUploadedFile(file);
      await uploadFileFetching(file);
    } catch (e) {
      console.log(e)
    }
  };


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
      setProcessingResult(null);
    } else if (currentStep === 'processing') {
      dispatch(setCurrentStep('upload'));
    }
  };

  const getStepComponent = () => {
    if (selectedFile) {
      if (selectedFile.text) {
        return ResultStep;
      } else {
        return ProcessingStep;
      }
    }

    return stepConfig[currentStep].component;
  };
  const StepComponent = getStepComponent();
  const {title, showNavigation} = stepConfig[currentStep];

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

