import TranscriptionWorkspace from '../../../widgets/Hero/index';
import Header from '../../../widgets/Header/index';
import './TasksPage.scss';
import Footer from '../../../widgets/Footer/ui/Footer';

const TasksPage = () => {
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

export default TasksPage;
