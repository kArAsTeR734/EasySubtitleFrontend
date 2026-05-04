'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { TasksService } from '@/api/services/TasksService.ts';
import { type TaskResponse } from '@/api/types/api-types.ts';

// ============================================================
// Константы
// ============================================================
const ROWS_PER_PAGE = 30; // limit

// Описание колонок
interface Column {
  id: 'name' | 'status' | 'created_at';
  label: string;
  sortable: boolean; // можно ли сортировать
}

const COLUMNS: Column[] = [
  { id: 'name', label: 'Название', sortable: true },
  { id: 'status', label: 'Статус', sortable: true },
  { id: 'created_at', label: 'Создана', sortable: true }
];

// Цвета чипсов для статусов
const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  created: 'default',
  running: 'primary',
  error: 'error',
  done: 'success'
};

// ============================================================
// Помощники
// ============================================================

/** Форматирование даты */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ============================================================
// Компонент
// ============================================================

export default function TasksTable() {
  // ---------- Данные ----------
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // ---------- Пагинация ----------
  const [page, setPage] = useState(1); // пользователь видит страницы (1-based)

  // ---------- Сортировка ----------
  const [sort, setSort] = useState<'name' | 'status' | 'created_at'>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // ============================================================
  // Загрузка данных
  // ============================================================
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      // page=1 → offset=0, page=2 → offset=30, ...
      const offset = (page - 1) * ROWS_PER_PAGE;

      const response = await TasksService.getAllTasks(
        ROWS_PER_PAGE,
        offset,
        sort,
        order
      );

      setTasks(response.tasks);
      setTotal(response.total);
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
  // Обработчики
  // ============================================================

  /** Смена страницы */
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  /** Клик по заголовку колонки — сортировка */
  const handleSort = (columnId: 'name' | 'status' | 'created_at') => {
    if (sort === columnId) {
      // Меняем направление
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Новая колонка — сортируем по возрастанию
      setSort(columnId);
      setOrder('asc');
    }
    setPage(1); // сброс на первую страницу
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
                  tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      hover
                      sx={{ cursor: 'pointer' }}
                    >
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
                          label={task.status}
                          size="small"
                          color={STATUS_COLORS[task.status] ?? 'default'}
                        />
                      </TableCell>

                      {/* Дата создания */}
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Пагинация */}
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