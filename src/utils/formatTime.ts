import type {Timestamp} from "../api/types/api-types.ts";

export const parseTimestamps = (text: string): Timestamp[] => {
  if (!text) return [];

  const lines = text.split('\n').filter(line => line.trim());
  const parsed = lines.map(line => {
    // Регулярное выражение для извлечения временных меток и текста
    const match = line.match(/(\d+:\d+:\d+)-(\d+:\d+:\d+):\s*(.+)/);
    if (match) {
      return {
        start: match[1], // 0:00:00
        end: match[2],   // 0:00:01
        text: match[3]   // текст после таймкодов
      };
    }
    return null;
  }).filter((timestamp): timestamp is Timestamp => timestamp !== null);

  return parsed;
};