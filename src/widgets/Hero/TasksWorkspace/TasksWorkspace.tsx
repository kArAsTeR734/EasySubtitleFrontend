import './TasksWorkspace.scss';
import CreateTaskModal from '@widgets/CreateTaskForm';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import TasksTable from '@components/TasksTable';
import { useCallback, useState } from 'react';

export const TasksWorkspace = () => {
  const [tableKey, setTableKey] = useState(0);

  const handleTaskCreated = useCallback(() => {
    setTableKey((prev) => prev + 1);
  }, []);

  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.modalReducer);
  const { openModal, closeModal } = modalSlice.actions;

  const isCreateOpen = activeModal === 'createTask';

  return (
    <div className="hero">
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 3 }}>
        {/* Заголовок + кнопка в одной строке */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            PINN задачи
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => dispatch(openModal('createTask'))}
          >
            Создать задачу
          </Button>
        </Box>

        <TasksTable key={tableKey} />

        <CreateTaskModal
          isOpen={isCreateOpen}
          onClose={() => dispatch(closeModal())}
          onTaskCreated={handleTaskCreated}
        />
      </Box>
    </div>
  );
};
