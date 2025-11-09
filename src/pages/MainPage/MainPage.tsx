import TranscriptionWorkspace from "../../widgets/Hero";
import Header from "../../widgets/Header";
import Sidebar from "../../widgets/Sidebar";
import './MainPage.scss'

const MainPage = () => {
  return (
      <>
        <Header isLoggedIn={true}/>
        <div className="page-wrapper">
          <Sidebar/>
          <main className="main-content">
            <TranscriptionWorkspace/>
          </main>
        </div>
      </>
  );
};

export default MainPage;