import MainPage from '../pages/MainPage/MainPage.tsx';
import { AuthProvider } from '@app/context/UserContext.tsx';

function App() {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
}

export default App;
