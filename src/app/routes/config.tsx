import type { RouteObject } from 'react-router-dom';
import MainPage from '@pages/MainPage/ui/MainPage.tsx';
import DocumentationPage from '@pages/DocumentationPage/ui/DocumentationPage.tsx';

export type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
};

export const PATHS = {
  HOME: '/',
  DOCUMENTATION: '/documentation',
  NOT_FOUND: '*',
} as const;

const getRoutesConfig = (): AppRouteObject[] => [
  {
    path: PATHS.HOME,
    element: <MainPage />,
  },
  {
    path: PATHS.DOCUMENTATION,
    element: <DocumentationPage />,
  },
];
export default getRoutesConfig;
