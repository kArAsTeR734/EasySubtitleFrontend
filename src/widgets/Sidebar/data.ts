import type {FileData} from "../../api/types/api-types.ts";

export const mockFileData: FileData[] = [
  { id: "1", title: "meeting_audio_001", timeOfUpload: "2024-01-15 10:30:15", text: "Первая запись транскрипции с довольно длинным текстом для проверки отображения" },
  { id: "2", title: "conference_call", timeOfUpload: "2024-01-15 11:45:22", text: "Второй файл с результатами обработки аудио" },
  { id: "3", title: "friday_meeting", timeOfUpload: "2024-01-15 12:20:33", text: "Запись совещания от пятницы с обсуждением проекта" },
  { id: "4", title: "interview_candidate", timeOfUpload: "2024-01-15 14:15:47", text: "Интервью с кандидатом на позицию фронтенд разработчика" },
  { id: "5", title: "webdev_podcast", timeOfUpload: "2024-01-15 15:40:19", text: "Подкаст о новых технологиях в веб-разработке" },
  { id: "6", title: "ml_lecture", timeOfUpload: "2024-01-16 09:25:11", text: "Лекция по машинному обучению и искусственному интеллекту" },
  { id: "7", title: "voice_commands", timeOfUpload: "2024-01-16 10:50:38", text: "Запись голосовых команд для системы управления" },
  { id: "8", title: "feature_ideas", timeOfUpload: "2024-01-16 13:20:54", text: "Аудио заметки с идеями для нового функционала" },
  { id: "9", title: "client_call", timeOfUpload: "2024-01-16 16:05:27", text: "Запись телефонного разговора с клиентом" },
  { id: "10", title: "morning_standup", timeOfUpload: "2024-01-17 08:40:12", text: "Утренний стендап команды разработки" },
  { id: "11", title: "tech_requirements", timeOfUpload: "2024-01-17 11:15:45", text: "Обсуждение технических требований к новому модулю" },
  { id: "12", title: "typescript_webinar", timeOfUpload: "2024-01-17 14:30:21", text: "Запись вебинара по TypeScript и React" },
  { id: "13", title: "onboarding_guide", timeOfUpload: "2024-01-18 10:00:33", text: "Инструкция по использованию системы для новых сотрудников" },
  { id: "14", title: "product_presentation", timeOfUpload: "2024-01-18 12:45:19", text: "Запись презентации нового продукта" },
  { id: "15", title: "bug_discussion", timeOfUpload: "2024-01-18 15:20:47", text: "Обсуждение багов и проблем в текущей версии" },
  { id: "16", title: "sprint_retro", timeOfUpload: "2024-01-19 09:35:28", text: "Ретроспектива спринта и планирование следующего" },
  { id: "17", title: "voice_assistant_test", timeOfUpload: "2024-01-19 11:50:14", text: "Запись тестового сценария для голосового помощника" },
  { id: "18", title: "nlp_expert_interview", timeOfUpload: "2024-01-19 14:15:39", text: "Интервью с экспертом в области NLP" },
  { id: "19", title: "api_tutorial", timeOfUpload: "2024-01-20 10:25:52", text: "Запись обучающего материала по работе с API" },
  { id: "20", title: "final_transcription", timeOfUpload: "2024-01-20 13:40:17", text: "Финальная версия транскрипции после редактирования" }
];