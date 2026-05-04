import './TranscriptionWorkspace.scss';
import CreateTaskModal from '@widgets/CreateTaskForm';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { Button } from '@/shared/components/Button/Button';
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
  const { activeModal } = useAppSelector((state) => state.modalReducer);
  const { openModal,closeModal } = modalSlice.actions;

  const isCreateOpen = activeModal === 'createTask';

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
        <Button
          onClick={() => dispatch(openModal('createTask'))}
          className="hero__title h3">Создать задачу</Button>
        <CreateTaskModal isOpen={isCreateOpen} onClose={() => dispatch(closeModal())} />
      </div>
    </section>
  );
};
