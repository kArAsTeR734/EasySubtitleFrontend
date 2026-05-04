import './TranscriptionWorkspace.scss';
import CreateTaskModal from '@widgets/CreateTaskForm';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { Button } from '@/shared/components/Button/Button';
import TasksTable from '@components/TasksTable';

export const TranscriptionWorkspace = () => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.modalReducer);
  const { openModal, closeModal } = modalSlice.actions;

  const isCreateOpen = activeModal === 'createTask';

  return (
    <section className="hero">
      <div className="hero--inner container">
        <Button
          onClick={() => dispatch(openModal('createTask'))}
          className="hero__title h3">Создать задачу</Button>
        <CreateTaskModal isOpen={isCreateOpen} onClose={() => dispatch(closeModal())} />

        <TasksTable/>
      </div>
    </section>
  );
};
