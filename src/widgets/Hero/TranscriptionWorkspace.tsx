import './TranscriptionWorkspace.scss';
import Button from '@components/Button';
// import CreateTaskModal from '@widgets/CreateTaskForm';
// import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
// import { transcriptionSlice } from '@app/store/reducers/TranscriptionSlice.ts';
// import { useFileUpload } from '@/features/Transcriptions/useFileUpload.ts';

export const TranscriptionWorkspace = () => {
  // const { selectedFile, currentStep } = useAppSelector(
  //   (state) => state.transcriptionReducer,
  // );
  // const { setCurrentStep, clearSelectedFile } = transcriptionSlice.actions;
  // const dispatch = useAppDispatch();
  //
  // const {
  //   uploadedFile,
  //   setUploadedFile,
  //   uploadFile,
  //   isUploading,
  //   fileId,
  //   error
  // } = useFileUpload();

  return (
    <section className="hero">
      <div className="hero--inner container">
        <Button className="hero__title h3">{'Создать PINN задачу'}</Button>
        {/*<CreateTaskModal isOpen={} onClose={}*/}
      </div>
    </section>
  );
};
