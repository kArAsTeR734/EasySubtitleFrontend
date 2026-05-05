import Modal from '@shared/components/Modal';
import { type FC, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import CreateTaskForm from '@widgets/CreateTaskForm/ui/CreateTask/CreateTaskForm';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            onTaskCreated,
                                                          }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback(() => {
    setShowSuccess(true);
    onClose();
    onTaskCreated(); // ← обновить таблицу
  }, [onClose, onTaskCreated]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div style={{ maxHeight: '80vh', overflowY: 'auto', padding: '8px' }}>
          <CreateTaskForm onSuccess={handleSuccess} />
        </div>
      </Modal>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSuccess(false)}
          sx={{ width: '100%' }}
        >
          Задача успешно создана
        </Alert>
      </Snackbar>
    </>
  );
};