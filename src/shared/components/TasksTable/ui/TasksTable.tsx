import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Delete,
  Download,
  FirstPage,
  Image,
  LastPage,
  Memory,
  PlayArrow,
  Refresh,
  Search,
} from '@mui/icons-material';
import { TasksService } from '@/api/services/TasksService.ts';
import { type TaskResponse } from '@/api/types/api-types.ts';

// ============================================================
// Константы
// ============================================================
const ROWS_PER_PAGE = 9;

interface Column {
  id: string;
  label: string;
  sortable: boolean;
  width: string;
  align: 'left' | 'center';
}

// COLUMNS — добавить после status
const COLUMNS: Column[] = [
  {
    id: 'name',
    label: 'Название',
    sortable: true,
    width: '20%',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Статус',
    sortable: true,
    width: '20%',
    align: 'center',
  },
  { id: 'mode', label: 'Тип', sortable: false, width: '12%', align: 'center' },
  {
    id: 'created_at',
    label: 'Создана',
    sortable: true,
    width: '18%',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Действия',
    sortable: false,
    width: '28%',
    align: 'center',
  },
];

const STATUS_COLORS: Record<
  string,
  'default' | 'primary' | 'success' | 'warning' | 'error'
> = {
  created: 'default',
  in_queue: 'warning',
  running: 'primary',
  error: 'error',
  done: 'success',
};

const STATUS_TEXT: Record<string, string> = {
  created: 'создана',
  in_queue: 'в очереди',
  running: 'выполняется',
  error: 'ошибка',
  done: 'выполнена',
};

const MODE_TEXT: Record<string, string> = {
  train: 'Обучение',
  retrain: 'Дообучение',
  predict: 'Предугадывание',
};

const MODE_ICON: Record<string, React.ReactNode> = {
  train: <Memory fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />,
  retrain: <Refresh fontSize="small" sx={{ mr: 0.5, color: 'success.main' }} />,
  predict: <Search fontSize="small" sx={{ mr: 0.5, color: 'warning.main' }} />,
};

// ============================================================
// Помощники
// ============================================================

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function openPdf(blob: Blob) {
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
}

/**
 * Читает параметры из URL и возвращает начальные значения.
 * Если параметров нет — значения по умолчанию.
 */
function getInitialParams(): {
  page: number;
  sort: 'name' | 'status' | 'created_at';
  order: 'asc' | 'desc';
} {
  if (typeof window === 'undefined') {
    return { page: 1, sort: 'created_at', order: 'desc' };
  }
  const sp = new URLSearchParams(window.location.search);
  return {
    page: Math.max(1, parseInt(sp.get('page') || '1', 10)),
    sort: (sp.get('sort') as 'name' | 'status' | 'created_at') || 'created_at',
    order: (sp.get('order') as 'asc' | 'desc') || 'desc',
  };
}

/** Сохраняет состояние в URL (не перезагружая страницу) */
function updateURL(page: number, sort: string, order: string) {
  const sp = new URLSearchParams(window.location.search);
  sp.set('page', String(page));
  sp.set('sort', sort);
  sp.set('order', order);
  const newUrl = `${window.location.pathname}?${sp.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

// ============================================================
// Компонент пагинации
// ============================================================

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

function CustomPagination({
  page,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  const [inputValue, setInputValue] = useState(String(page));

  // Синхронизируем input со значением page извне
  useEffect(() => {
    setInputValue(String(page));
  }, [page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      onPageChange(num);
    } else {
      setInputValue(String(page)); // сброс при ошибке
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title="Первая страница">
        <span>
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => onPageChange(1)}
          >
            <FirstPage />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Предыдущая">
        <span>
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft />
          </IconButton>
        </span>
      </Tooltip>

      <Typography variant="body2" sx={{ mx: 1, whiteSpace: 'nowrap' }}>
        Страница
      </Typography>

      <TextField
        size="small"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputSubmit}
        onKeyDown={handleKeyDown}
        sx={{ width: 60 }}
        inputProps={{ style: { textAlign: 'center' }, min: 1, max: totalPages }}
      />

      <Typography variant="body2" sx={{ mx: 0.5, whiteSpace: 'nowrap' }}>
        из {totalPages}
      </Typography>

      <Tooltip title="Следующая">
        <span>
          <IconButton
            size="small"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Последняя страница">
        <span>
          <IconButton
            size="small"
            disabled={page === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            <LastPage />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

// ============================================================
// Компонент таблицы
// ============================================================

export default function TasksTable() {
  const initial = getInitialParams();

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(initial.page);
  const [sort, setSort] = useState<'name' | 'status' | 'created_at'>(
    initial.sort,
  );
  const [order, setOrder] = useState<'asc' | 'desc'>(initial.order);

  const [runningTaskId, setRunningTaskId] = useState<string | null>(null);

  // ============================================================
  // Загрузка данных
  // ============================================================
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * ROWS_PER_PAGE;
      const response = await TasksService.getAllTasks(
        ROWS_PER_PAGE,
        offset,
        sort,
        order,
      );
      setTasks(Array.isArray(response?.tasks) ? response.tasks : []);
      setTotal(response?.total || 0);
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  }, [page, sort, order]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Сохраняем состояние в URL при изменении page/sort/order
  useEffect(() => {
    updateURL(page, sort, order);
  }, [page, sort, order]);

  // ============================================================
  // Обработчики
  // ============================================================

  const handleRun = async (taskId: string) => {
    setRunningTaskId(taskId);
    try {
      await TasksService.runTask(taskId);
      await fetchTasks();
    } catch (err) {
      console.error('Failed to run task', err);
    } finally {
      setRunningTaskId(null);
    }
  };

  const handleDownload = async (taskId: string, type: 'data' | 'output') => {
    try {
      const blob = await TasksService.downloadResults(taskId, type);
      downloadBlob(blob, `task_${taskId}_${type}.zip`);
    } catch (err) {
      console.error('Failed to download', err);
    }
  };

  const handlePlot = async (taskId: string) => {
    try {
      const blob = await TasksService.getPlot(taskId);
      openPdf(blob);
    } catch (err) {
      console.error('Failed to load plot', err);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Удалить задачу?')) return;
    try {
      await TasksService.deleteTaskByID(taskId);
      await fetchTasks();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (columnId: string) => {
    if (sort === columnId) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSort(columnId as 'name' | 'status' | 'created_at');
      setOrder('asc');
    }
    setPage(1);
  };

  // ============================================================
  // Рендер
  // ============================================================
  const totalPages = Math.max(1, Math.ceil(total / ROWS_PER_PAGE));

  return (
    <Box sx={{ width: '100%', mt: -2 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress
            sx={{
              color: 'primary.100',
              '& .MuiCircularProgress-circle': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      )}

      {!loading && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: '100%', overflowX: 'auto' }}
          >
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                        width: col.width,
                        fontWeight: 600,
                        textAlign: col.align,
                      }}
                    >
                      {col.sortable ? (
                        <TableSortLabel
                          active={sort === col.id}
                          direction={sort === col.id ? order : 'asc'}
                          onClick={() => handleSort(col.id)}
                          sx={{
                            // Убираем отступ слева у иконки, чтобы текст не смещался
                            '& .MuiTableSortLabel-icon': {
                              position: 'absolute',
                              right: -30,
                              marginLeft: 0,
                            },
                          }}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        Задач пока нет
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => {
                    const canDownloadOutput =
                      task.status === 'error' || task.status === 'done';
                    const canRun = task.status === 'created';
                    const canDelete =
                      task.status !== 'running' && task.status !== 'in_queue';

                    return (
                      <TableRow key={task.id} hover>
                        {/* Название */}
                        <TableCell
                          align={COLUMNS[0].align}
                          sx={{ width: COLUMNS[0].width }}
                        >
                          <Tooltip title={task.name} arrow>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              sx={{
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {task.name}
                            </Typography>
                          </Tooltip>
                          <Tooltip title={task.description || '—'} arrow>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block',
                              }}
                            >
                              {task.description || '—'}
                            </Typography>
                          </Tooltip>
                        </TableCell>

                        {/* Статус */}
                        <TableCell
                          sx={{ width: COLUMNS[1].width, textAlign: 'center' }}
                        >
                          <Chip
                            label={STATUS_TEXT[task.status] ?? 'unexpected'}
                            size="small"
                            color={STATUS_COLORS[task.status] ?? 'default'}
                          />
                        </TableCell>

                        {/* Тип */}
                        <TableCell
                          sx={{ width: COLUMNS[2].width, textAlign: 'center' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {MODE_ICON[task.mode]}
                            <Typography variant="body2">
                              {MODE_TEXT[task.mode] ?? task.mode}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Дата */}
                        <TableCell
                          sx={{ width: COLUMNS[3].width, textAlign: 'center' }}
                        >
                          <Typography variant="body2">
                            {formatDate(task.created_at)}
                          </Typography>
                          {task.error && (
                            <Tooltip title={task.error} arrow>
                              <Typography
                                variant="caption"
                                color="error"
                                sx={{
                                  maxWidth: 180,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  display: 'block',
                                  mx: 'auto',
                                }}
                              >
                                {task.error}
                              </Typography>
                            </Tooltip>
                          )}
                        </TableCell>

                        {/* Действия */}
                        <TableCell
                          align={COLUMNS[4].align}
                          sx={{ width: COLUMNS[4].width }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Tooltip title="Запустить">
                              <span>
                                <IconButton
                                  size="small"
                                  color="primary"
                                  disabled={!canRun}
                                  onClick={() => handleRun(task.id)}
                                >
                                  {runningTaskId === task.id ? (
                                    <CircularProgress
                                      size={18}
                                      sx={{
                                        color: 'primary.100',
                                        '& .MuiCircularProgress-circle': {
                                          color: 'primary.main',
                                        },
                                      }}
                                    />
                                  ) : (
                                    <PlayArrow />
                                  )}
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip title="Скачать исходные данные">
                              <IconButton
                                size="small"
                                onClick={() => handleDownload(task.id, 'data')}
                              >
                                <Download />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Скачать результат">
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={!canDownloadOutput}
                                  onClick={() =>
                                    handleDownload(task.id, 'output')
                                  }
                                >
                                  <Download />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip title="График">
                              <span>
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  disabled={!task.have_plot}
                                  onClick={() => handlePlot(task.id)}
                                >
                                  <Image />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip title="Удалить">
                              <IconButton
                                size="small"
                                color="error"
                                disabled={!canDelete}
                                onClick={() => handleDelete(task.id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Пагинация */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
