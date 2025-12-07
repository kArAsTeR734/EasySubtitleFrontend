import type { Timestamp } from '../api/types/api-types.ts';

export const parseTimestamps = (text: string): Timestamp[] => {
  if (!text) return [];

  const lines = text.split('\n').filter((line) => line.trim());

  return lines
    .map((line) => {
      const match = line.match(/(\d+:\d+:\d+)-(\d+:\d+:\d+):\s*(.+)/);
      if (match) {
        return {
          start: match[1],
          end: match[2],
          text: match[3],
        };
      }
      return null;
    })
    .filter((timestamp): timestamp is Timestamp => timestamp !== null);
};

export const formatTime = (timeString: string | null | undefined): string => {
  if (!timeString) return '00:00';

  // Если время в формате "0:00:00"
  const parts = timeString.split(':');

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    // Убираем лишние нули в часах
    const formattedHours = parseInt(hours) > 0 ? `${hours}:` : '';
    return `${formattedHours}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  return timeString;
};
