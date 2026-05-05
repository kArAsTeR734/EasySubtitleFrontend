import type { RouteObject } from 'react-router-dom';
import TasksPage from '@pages/TasksPage/ui/TasksPage.tsx';
import DocumentationPage from '@pages/DocumentationPage/ui/DocumentationPage.tsx';

export type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
};

export const PATHS = {
  HOME: '/',
  TASKS: '/tasks',
  NOT_FOUND: '*'
} as const;

const getRoutesConfig = (): AppRouteObject[] => [
  {
    path: PATHS.HOME,
    element: <DocumentationPage />
  },
  {
    path: PATHS.TASKS,
    element: <TasksPage />
  }
];
export default getRoutesConfig;
