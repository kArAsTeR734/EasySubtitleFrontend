import MainPage from '../pages/MainPage/MainPage.tsx';
import { useInitializeUser } from '../features/User/useInitUser.ts';

function App() {
  useInitializeUser();

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
