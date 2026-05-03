import './TranscriptionWorkspace.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { transcriptionSlice } from '@app/store/reducers/TranscriptionSlice.ts';
import { useFileUpload } from '@/features/Transcriptions/useFileUpload.ts';

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

  return (
    <section className="hero">
      <div className="hero--inner container">
        <h2 className="hero__title h3">{"Заголовок"}</h2>

        {isUploading && <div>Загрузка файла...</div>}

      </div>
    </section>
  );
};
