import TranscriptionWorkspace from "../../widgets/Hero";
import Header from "../../widgets/Header";
import Sidebar from "../../widgets/Sidebar";
import './MainPage.scss'
import TranscriptionInstruction from "../../widgets/Hero/TranscriptionInstruction";
import Footer from "../../widgets/Footer/ui/Footer";

const MainPage = () => {
  return (
      <>
        <Header/>
        <div className="page-wrapper">
          <Sidebar/>
          <main className="main-content">
            <TranscriptionWorkspace/>
            <TranscriptionInstruction/>
          </main>
        </div>
        <Footer/>
      </>
  );
};

export default MainPage;