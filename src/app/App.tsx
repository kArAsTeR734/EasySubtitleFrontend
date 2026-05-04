import { AuthProvider } from '@app/context/UserContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import getRoutesConfig from '@app/routes/config.tsx';

function App() {
  const router = useMemo(() => createBrowserRouter(getRoutesConfig()), []);
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
