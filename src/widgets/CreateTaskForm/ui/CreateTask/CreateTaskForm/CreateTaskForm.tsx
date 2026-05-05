import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { Close, CloudUpload, Description, InsertDriveFile } from '@mui/icons-material';
import type { TaskCreateRequestData } from '@/entities/Task/models/types.ts';
import { TasksService } from '@/api/services/TasksService.ts';

// ============================================================
// Типы
// ============================================================

type TaskMode = 'train' | 'retrain' | 'predict';

/** Ключи файлов, которые мы ждём */
type FileSlot = 'functions.py' | 'config.yaml' | 'data.mat' | 'checkpoint.ckpt';

interface AttachedFiles {
  'functions.py'?: File;
  'config.yaml'?: File;
  'data.mat'?: File;
  'checkpoint.ckpt'?: File;
}

const EXTENSION_TO_SLOT: Record<string, FileSlot> = {
  '.py': 'functions.py',
  '.yaml': 'config.yaml',
  '.yml': 'config.yaml',
  '.mat': 'data.mat',
  '.ckpt': 'checkpoint.ckpt',
  '.pt': 'checkpoint.ckpt'
};

const FILE_REQUIREMENTS: Record<
  FileSlot,
  { label: string; required: TaskMode[] }
> = {
  'functions.py': {
    label: 'Функции (.py)',
    required: ['train', 'retrain', 'predict']
  },
  'config.yaml': {
    label: 'Конфигурация (.yaml / .yml)',
    required: ['train', 'retrain', 'predict']
  },
  'data.mat': {
    label: 'Данные (.mat)',
    required: ['train', 'retrain']
  },
  'checkpoint.ckpt': {
    label: 'Чекпоинт (.ckpt / .pt)',
    required: ['retrain', 'predict']
  }
};


const MODE_LABELS: Record<TaskMode, string> = {
  train: 'Обучить',
  retrain: 'Дообучить',
  predict: 'Предугадать'
};

const MODE_HINTS: Record<TaskMode, string> = {
  train: 'Требуются: .py, .yaml, .mat',
  retrain: 'Требуются: .py, .yaml, .mat, .ckpt',
  predict: 'Требуются: .py, .yaml, .ckpt'
};

function getSlotByExtension(file: File): FileSlot | null {
  const dot = file.name.lastIndexOf('.');
  if (dot === -1) return null;
  const ext = file.name.slice(dot).toLowerCase();       // ".py", ".mat", ...
  return EXTENSION_TO_SLOT[ext] ?? null;
}

// ============================================================
// Компонент
// ============================================================

export default function CreateTaskForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<TaskMode>('train');
  const [files, setFiles] = useState<AttachedFiles>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // Валидация
  // ============================================================
  const validate = useCallback((): string | null => {
    if (name.trim().length === 0) {
      return 'Название задачи обязательно';
    }

    for (const [slot, req] of Object.entries(FILE_REQUIREMENTS)) {
      const key = slot as FileSlot;
      if (req.required.includes(mode) && !files[key]) {
        return `Файл «${req.label}» обязателен для режима «${MODE_LABELS[mode]}»`;
      }
    }

    return null;
  }, [name, mode, files]);

  // ============================================================
  // Отправка формы
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const req: TaskCreateRequestData = {
        name: name.trim(),
        description: description.trim() || undefined,
        mode
      };

      await TasksService.createTask(
        req,
        files['functions.py'],
        files['config.yaml'],
        files['data.mat'],
        files['checkpoint.ckpt']);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Не удалось создать задачу');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // Drag-and-drop + выбор из ОС
  // ============================================================
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => {
      const next = { ...prev };
      for (const file of acceptedFiles) {
        const slot = getSlotByExtension(file);
        if (slot) {
          next[slot] = file;
        }
      }
      return next;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,   // клик по зоне НЕ открывает выбор файлов
    noKeyboard: true
  });

  // ============================================================
  // Помощники
  // ============================================================
  const removeFile = (slot: FileSlot) => {
    setFiles((prev) => ({ ...prev, [slot]: null }));
  };

  /** Прикрепить файл конкретного слота через стандартный диалог ОС */
  const attachFile = (slot: FileSlot) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFiles((prev) => ({ ...prev, [slot]: file }));
      }
    };
    input.click();
  };

  // ============================================================
  // Рендер
  // ============================================================
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardHeader title="Создать PINN задачу" />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} {...getRootProps()}>
          <input {...getInputProps()} />

          {/* Зона drag-and-drop */}
          <Box
            onClick={open}   // ← клик открывает выбор файлов
            sx={{
              border: 2,
              borderStyle: 'dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              p: 4,
              mb: 3,
              textAlign: 'center',
              bgcolor: isDragActive ? 'action.hover' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <CloudUpload sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Перетащите файлы сюда или нажмите для выбора
            </Typography>
          </Box>

          {/* Название */}
          <TextField
            fullWidth
            label="Название"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Теплопроводность стержня"
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Описание */}
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опционально"
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />

          {/* Режим */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Режим</InputLabel>
            <Select
              value={mode}
              label="Режим"
              onChange={(e: SelectChangeEvent) =>
                setMode(e.target.value as TaskMode)
              }
              disabled={isSubmitting}
            >
              <MenuItem value="train">Обучить</MenuItem>
              <MenuItem value="retrain">Дообучить</MenuItem>
              <MenuItem value="predict">Предугадать</MenuItem>
            </Select>
            <FormHelperText>{MODE_HINTS[mode]}</FormHelperText>
          </FormControl>

          {/* Файлы */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Прикреплённые файлы
          </Typography>
          <List disablePadding>
            {(Object.keys(FILE_REQUIREMENTS) as FileSlot[]).map((slot) => {
              const req = FILE_REQUIREMENTS[slot];
              const file = files[slot];
              const isRequired = req.required.includes(mode);

              return (
                <ListItem
                  key={slot}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1
                  }}
                  secondaryAction={
                    file ? (
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(slot)}
                        disabled={isSubmitting}
                      >
                        <Close />
                      </IconButton>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => attachFile(slot)}
                        disabled={isSubmitting}
                      >
                        Прикрепить
                      </Button>
                    )
                  }
                >
                  <ListItemIcon>
                    {file ? (
                      <InsertDriveFile color="success" />
                    ) : (
                      <Description color="disabled" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        {req.label}
                        {isRequired && (
                          <Typography
                            component="span"
                            color="error"
                            sx={{ ml: 0.5 }}
                          >
                            *
                          </Typography>
                        )}
                      </>
                    }
                    secondary={file?.name ?? 'Не прикреплён'}
                    secondaryTypographyProps={{
                      color: file ? 'success.main' : 'text.secondary'
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Ошибка */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Кнопка отправки */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isSubmitting ? 'Создание...' : 'Создать задачу'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}