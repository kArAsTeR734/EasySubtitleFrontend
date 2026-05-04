import TranscriptionWorkspace from '../../../widgets/Hero/index';
import Header from '../../../widgets/Header/index';
import Sidebar from '../../../widgets/Sidebar/index';
import './MainPage.scss';
import TranscriptionInstruction from '../../../widgets/Hero/TranscriptionInstruction/index';
import Footer from '../../../widgets/Footer/ui/Footer';

const MainPage = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="page-content">
          <Sidebar />
          <main className="main-content">
            <TranscriptionWorkspace />
            <TranscriptionInstruction />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
