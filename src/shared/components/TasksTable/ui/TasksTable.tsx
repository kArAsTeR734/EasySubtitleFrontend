'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { Delete, Download, Image, PlayArrow } from '@mui/icons-material';
import { TasksService } from '@/api/services/TasksService.ts';
import { type TaskResponse } from '@/api/types/api-types.ts';

// ============================================================
// Константы
// ============================================================
const ROWS_PER_PAGE = 7;

// Описание колонок
interface Column {
  id: string;
  label: string;
  sortable: boolean;
}

const COLUMNS: Column[] = [
  { id: 'name', label: 'Название', sortable: true },
  { id: 'status', label: 'Статус', sortable: true },
  { id: 'created_at', label: 'Создана', sortable: true },
  { id: 'actions', label: 'Действия', sortable: false }
];

// Цвета чипсов для статусов
const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  created: 'default',
  in_queue: 'warning',     // жёлтый/оранжевый — ожидание
  running: 'primary',      // синий — выполняется
  error: 'error',          // красный — ошибка
  done: 'success',         // зелёный — готово
};

const STATUS_TEXT: Record<string, string> = {
  created: 'создана',
  in_queue: 'в очереди',
  running: 'выполняется',
  error: 'ошибка',
  done: 'выполнена',
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
    minute: '2-digit'
  });
}

/** Скачать файл по URL, созданному из Blob */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Открыть PDF в новой вкладке */
function openPdf(blob: Blob) {
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
}

// ============================================================
// Компонент
// ============================================================

export default function TasksTable() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'name' | 'status' | 'created_at'>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // ID задачи, которая сейчас запускается (для спиннера на кнопке)
  const [runningTaskId, setRunningTaskId] = useState<string | null>(null);

  // ============================================================
  // Загрузка данных
  // ============================================================
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * ROWS_PER_PAGE;
      const response = await TasksService.getAllTasks(ROWS_PER_PAGE, offset, sort, order);
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

  // ============================================================
  // Обработчики действий
  // ============================================================

  /** Запуск задачи */
  const handleRun = async (taskId: string) => {
    setRunningTaskId(taskId);
    try {
      await TasksService.runTask(taskId);
      await fetchTasks(); // обновить статус
    } catch (err) {
      console.error('Failed to run task', err);
    } finally {
      setRunningTaskId(null);
    }
  };

  /** Скачать data.zip или output.zip */
  const handleDownload = async (taskId: string, type: 'data' | 'output') => {
    try {
      const blob = await TasksService.downloadResults(taskId, type);
      downloadBlob(blob, `task_${taskId}_${type}.zip`);
    } catch (err) {
      console.error('Failed to download', err);
    }
  };

  /** Открыть график */
  const handlePlot = async (taskId: string) => {
    try {
      const blob = await TasksService.getPlot(taskId);
      openPdf(blob);
    } catch (err) {
      console.error('Failed to load plot', err);
    }
  };

  /** Удалить задачу */
  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Удалить задачу?')) return;
    try {
      await TasksService.deleteTaskByID(taskId);
      await fetchTasks(); // обновить список
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  // ============================================================
  // Сортировка и пагинация
  // ============================================================
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
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
  const totalPages = Math.ceil(total / ROWS_PER_PAGE);

  return (
    <Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.id}>
                      {col.sortable ? (
                        <TableSortLabel
                          active={sort === col.id}
                          direction={sort === col.id ? order : 'asc'}
                          onClick={() => handleSort(col.id)}
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
                    const canDownloadOutput = task.status === 'error' || task.status === 'done';
                    const canRun = task.status === 'created';
                    const canDelete = task.status !== 'running' && task.status !== 'in_queue';

                    return (
                      <TableRow key={task.id} hover>
                        {/* Название */}
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {task.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {task.description || '—'}
                          </Typography>
                        </TableCell>

                        {/* Статус */}
                        <TableCell>
                          <Chip
                            label={STATUS_TEXT[task.status] ?? 'unexpected'}
                            size="small"
                            color={STATUS_COLORS[task.status] ?? 'default'}
                          />
                        </TableCell>

                        {/* Дата */}
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(task.created_at)}
                          </Typography>
                          {task.error && (
                            <Typography variant="caption" color="error">
                              {task.error}
                            </Typography>
                          )}
                        </TableCell>

                        {/* Действия */}
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'nowrap' }}>
                            {/* Запуск */}
                            <Tooltip title="Запустить">
                              <span>
                                <IconButton
                                  size="small"
                                  color="primary"
                                  disabled={!canRun}
                                  onClick={() => handleRun(task.id)}
                                >
                                  {runningTaskId === task.id ? (
                                    <CircularProgress size={18} />
                                  ) : (
                                    <PlayArrow />
                                  )}
                                </IconButton>
                              </span>
                            </Tooltip>

                            {/* Скачать data */}
                            <Tooltip title="Скачать исходные данные">
                              <IconButton
                                size="small"
                                onClick={() => handleDownload(task.id, 'data')}
                              >
                                <Download />
                              </IconButton>
                            </Tooltip>

                            {/* Скачать output */}
                            <Tooltip title="Скачать результат">
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={!canDownloadOutput}
                                  onClick={() => handleDownload(task.id, 'output')}
                                >
                                  <Download />
                                </IconButton>
                              </span>
                            </Tooltip>

                            {/* График */}
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

                            {/* Удалить */}
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

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}