import TranscriptionWorkspace from '../../../widgets/Hero/index';
import Header from '../../../widgets/Header/index';
import './MainPage.scss';
import Footer from '../../../widgets/Footer/ui/Footer';

const MainPage = () => {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <TranscriptionWorkspace />
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
