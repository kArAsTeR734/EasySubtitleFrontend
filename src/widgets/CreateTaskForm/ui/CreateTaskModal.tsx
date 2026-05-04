import Modal from '@shared/components/Modal';
import { type FC } from 'react';
import CreateTaskForm from '@widgets/CreateTaskForm';

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
      <CreateTaskForm isOpen={false} onClose={function(): void {
              throw new Error('Function not implemented.');
          } } />
    </Modal>
  );
};