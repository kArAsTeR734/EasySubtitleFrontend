import './TranscriptionWorkspace.scss';
import CreateTaskModal from '@widgets/CreateTaskForm';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { Button } from '@/shared/components/Button/Button';
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
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modalReducer);
  const { toggleModal } = modalSlice.actions;

  const switchModal = () => {
    dispatch(toggleModal());
  };

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
        <Button onClick={switchModal} className="hero__title h3"></Button>
        <CreateTaskModal isOpen={isOpen} onClose={switchModal} />
      </div>
    </section>
  );
};
