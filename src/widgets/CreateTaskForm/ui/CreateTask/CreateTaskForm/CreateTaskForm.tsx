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
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import {
  Close,
  CloudUpload,
  Description,
  InsertDriveFile,
} from '@mui/icons-material';
import type { TaskCreateRequestData } from '@/entities/Task/models/types.ts';
import { TasksService } from '@/api/services/TasksService.ts';
import JSZip from 'jszip';

// ============================================================
// Типы
// ============================================================

type TaskMode = 'train' | 'retrain' | 'predict';

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
  '.pt': 'checkpoint.ckpt',
};

const FILE_REQUIREMENTS: Record<FileSlot, { label: string; required: TaskMode[] }> = {
  'functions.py': {
    label: 'Функции (.py)',
    required: ['train', 'retrain', 'predict'],
  },
  'config.yaml': {
    label: 'Конфигурация (.yaml / .yml)',
    required: ['train', 'retrain', 'predict'],
  },
  'data.mat': {
    label: 'Данные (.mat)',
    required: ['train', 'retrain', 'predict'],
  },
  'checkpoint.ckpt': {
    label: 'Чекпоинт (.ckpt / .pt)',
    required: ['retrain', 'predict'],
  },
};

const MODE_LABELS: Record<TaskMode, string> = {
  train: 'Обучить',
  retrain: 'Дообучить',
  predict: 'Предугадать',
};

const MODE_HINTS: Record<TaskMode, string> = {
  train: 'Требуются: .py, .yaml, .mat',
  retrain: 'Требуются: .py, .yaml, .mat, .ckpt',
  predict: 'Требуются: .py, .yaml, .mat, .ckpt',
};

function getSlotByExtension(fileName: string): FileSlot | null {
  const dot = fileName.lastIndexOf('.');
  if (dot === -1) return null;
  const ext = fileName.slice(dot).toLowerCase();
  return EXTENSION_TO_SLOT[ext] ?? null;
}

function isZipFile(file: File): boolean {
  return file.name.endsWith('.zip');
}

/**
 * Распаковать ZIP-архив и вернуть файлы, распределённые по слотам.
 * Использует встроенный в браузер JSZip или аналоги.
 * Требуется библиотека: npm install jszip
 */
async function extractZip(zipFile: File): Promise<Partial<AttachedFiles>> {
  const zip = await JSZip.loadAsync(zipFile);
  const extracted: Partial<AttachedFiles> = {};

  // Получаем массив файлов, в которых есть полезные расширения
  const validFiles = zip.filter((relativePath, file) => {
    if (file.dir) return false;
    // Игнорируем скрытые файлы и системные папки macOS
    return !(relativePath.startsWith('__MACOSX') || relativePath.startsWith('.'));
  });

  for (const file of validFiles) {
    const fileName = file.name.split('/').pop() ?? file.name;
    const slot = getSlotByExtension(fileName);
    if (slot && !extracted[slot]) {
      const blob = await file.async('blob');
      extracted[slot] = new File([blob], fileName, { type: blob.type });
    }
  }
  return extracted;
}

// ============================================================
// Компонент
// ============================================================

interface CreateTaskFormProps {
  onSuccess?: () => void;
}

export default function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<TaskMode>('train');
  const [files, setFiles] = useState<AttachedFiles>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unzipping, setUnzipping] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

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

    // Если режим train и приложен checkpoint — ошибка
    if (mode === 'train' && files['checkpoint.ckpt']) {
      return 'Файл «Чекпоинт (.ckpt / .pt)» не нужен для режима «Обучить». Удалите его.';
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
        mode,
      };

      await TasksService.createTask(
        req,
        files['functions.py'],
        files['config.yaml'],
        files['data.mat'],
        files['checkpoint.ckpt'],
      );

      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Не удалось создать задачу');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Проверяет, что в ZIP нет вложенных папок с файлами.
   * Допустимы только файлы в корне или в __MACOSX (она игнорируется).
   */
  function hasNestedFolders(zip: JSZip): boolean {
    const paths = Object.keys(zip.files);
    const realPaths = paths.filter(
      (p) =>
        !p.startsWith('__MACOSX') && !p.startsWith('.') && !zip.files[p].dir,
    );

    for (const path of realPaths) {
      const parts = path.split('/');
      // Если больше 2 частей — файл во вложенной папке (не корень)
      if (parts.length > 2) return true;
      // Если 2 части и первая не __MACOSX — тоже вложенность
      if (
        parts.length === 2 &&
        !parts[0].startsWith('__MACOSX') &&
        !parts[0].startsWith('.')
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Проверяет, что нет конфликтов: zip + файлы, дубли расширений, вложенность в zip.
   * Возвращает true, если всё валидно.
   */
  function validateFiles(
    regularFiles: File[],
    zipFiles: File[],
    existingFiles: AttachedFiles,
    extractedFromZip?: Partial<AttachedFiles>,
  ): string | null {
    // Правило 1: нельзя одновременно zip и обычные файлы
    if (zipFiles.length > 0 && regularFiles.length > 0) {
      return 'Нельзя загружать одновременно ZIP-архив и отдельные файлы. Выберите что-то одно.';
    }

    // Правило 2: если уже есть файлы — проверяем, что не будет дублей
    const allSlots: FileSlot[] = [];

    for (const file of regularFiles) {
      const slot = getSlotByExtension(file.name);
      if (slot) allSlots.push(slot);
    }

    if (extractedFromZip) {
      for (const slot of Object.keys(extractedFromZip) as FileSlot[]) {
        if (extractedFromZip[slot]) allSlots.push(slot);
      }
    }

    // Проверка дублей среди новых файлов
    const newSlotsSet = new Set(allSlots);
    if (newSlotsSet.size < allSlots.length) {
      return 'Найдены файлы с одинаковым расширением. Оставьте только один файл каждого типа.';
    }

    // Проверка дублей с уже существующими
    for (const slot of allSlots) {
      if (existingFiles[slot]) {
        return `Файл «${FILE_REQUIREMENTS[slot].label}» уже прикреплён. Удалите его перед загрузкой нового.`;
      }
    }

    return null;
  }

  // ============================================================
  // Drag-and-drop + выбор из ОС
  // ============================================================
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const zipFiles = acceptedFiles.filter(isZipFile);
      const regularFiles = acceptedFiles.filter((f) => !isZipFile(f));

      // Валидация до обработки
      const validationError = validateFiles(regularFiles, zipFiles, {});
      if (validationError) {
        setNotification({ open: true, message: validationError });
        return;
      }

      const next: AttachedFiles = {};

      // Обычные файлы
      for (const file of regularFiles) {
        const slot = getSlotByExtension(file.name);
        if (slot) next[slot] = file;
      }

      // ZIP
      if (zipFiles.length > 0) {
        setUnzipping(true);
        try {
          for (const zip of zipFiles) {
            const jsZip = await JSZip.loadAsync(zip);

            // Проверка на вложенность
            if (hasNestedFolders(jsZip)) {
              setNotification({
                open: true,
                message:
                  'ZIP-архив содержит вложенные папки. Все файлы должны быть в корне архива.',
              });
              setUnzipping(false);
              return;
            }

            const extracted = await extractZip(zip);

            // Валидация дублей после распаковки
            const dupError = validateFiles([], [], files, extracted);
            if (dupError) {
              setNotification({ open: true, message: dupError });
              setUnzipping(false);
              return;
            }

            for (const [slot, file] of Object.entries(extracted)) {
              if (file) next[slot as FileSlot] = file;
            }
          }
        } catch (err) {
          console.error('Failed to extract zip', err);
          setNotification({
            open: true,
            message: 'Не удалось распаковать архив',
          });
        } finally {
          setUnzipping(false);
        }
      }

      setFiles((prev) => ({ ...prev, ...next }));
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  // ============================================================
  // Помощники
  // ============================================================
  const removeFile = (slot: FileSlot) => {
    setFiles((prev) => ({ ...prev, [slot]: undefined }));
  };

  const attachFile = (_: FileSlot) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (isZipFile(file)) {
        setUnzipping(true);
        try {
          const jsZip = await JSZip.loadAsync(file);

          if (hasNestedFolders(jsZip)) {
            setNotification({
              open: true,
              message:
                'ZIP-архив содержит вложенные папки. Все файлы должны быть в корне архива.',
            });
            setUnzipping(false);
            return;
          }

          const extracted = await extractZip(file);

          const dupError = validateFiles([], [], {}, extracted);
          if (dupError) {
            setNotification({ open: true, message: dupError });
            setUnzipping(false);
            return;
          }

          // Перезаписываем все слоты из ZIP, остальные не трогаем
          setFiles((prev) => ({ ...prev, ...extracted }));
        } catch {
          setNotification({
            open: true,
            message: 'Не удалось распаковать архив',
          });
        } finally {
          setUnzipping(false);
        }
      } else {
        const fileSlot = getSlotByExtension(file.name);
        if (!fileSlot) return;

        setFiles((prev) => ({ ...prev, [fileSlot]: file }));
      }
    };
    input.click();
  };

  // ============================================================
  // Рендер
  // ============================================================
  return (
    <Card sx={{ maxWidth: 520, mx: 'auto', '& .modal__content': { p: 0 } }}>
      <CardHeader title="Создать PINN задачу" sx={{ pb: 0 }} />
      <CardContent sx={{ pt: 1 }}>
        <Box component="form" onSubmit={handleSubmit} {...getRootProps()}>
          <input {...getInputProps()} />

          {/* Зона drag-and-drop */}
          <Box
            onClick={open}
            sx={{
              border: 2,
              borderStyle: 'dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              p: 2,
              mb: 2,
              textAlign: 'center',
              bgcolor: isDragActive ? 'action.hover' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {unzipping ? (
              <>
                <CircularProgress size={24} sx={{ mb: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Распаковка архива...
                </Typography>
              </>
            ) : (
              <>
                <CloudUpload
                  sx={{ fontSize: 32, color: 'grey.400', mb: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Перетащите файлы или .zip архив
                </Typography>
              </>
            )}
          </Box>

          {/* Название */}
          <TextField
            fullWidth
            label="Название"
            required
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Теплопроводность стержня"
            disabled={isSubmitting}
            sx={{ mb: 1.5 }}
          />

          {/* Описание */}
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={2}
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опционально"
            disabled={isSubmitting}
            sx={{ mb: 1.5 }}
          />

          {/* Режим */}
          <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
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
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
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
                  dense
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 0.5,
                    py: 0.5,
                  }}
                  secondaryAction={
                    file ? (
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => removeFile(slot)}
                        disabled={isSubmitting}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => attachFile(slot)}
                        disabled={isSubmitting}
                        sx={{ py: 0, minHeight: 28 }}
                      >
                        Прикрепить
                      </Button>
                    )
                  }
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {file ? (
                      <InsertDriveFile color="success" fontSize="small" />
                    ) : (
                      <Description color="disabled" fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
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
                      </Typography>
                    }
                    secondary={file?.name ?? 'Не прикреплён'}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: file ? 'success.main' : 'text.secondary',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Ошибка */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 1.5 }}
              onClose={() => setError(null)}
            >
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
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={{ py: 1 }}
          >
            {isSubmitting ? 'Создание...' : 'Создать задачу'}
          </Button>
        </Box>
      </CardContent>
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setNotification({ open: false, message: '' })}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
