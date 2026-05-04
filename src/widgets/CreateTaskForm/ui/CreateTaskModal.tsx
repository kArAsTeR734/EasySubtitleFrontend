import Modal from '@shared/components/Modal';
import { type FC } from 'react';
import CreateTaskForm from '@widgets/CreateTaskForm/ui/CreateTask/CreateTaskForm';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                          }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '8px'
      }}>
        <CreateTaskForm />
      </div>
    </Modal>
  );
};