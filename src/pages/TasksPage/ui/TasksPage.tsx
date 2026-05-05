import TasksWorkspace from '@widgets/Hero/TasksWorkspace';
import Header from '../../../widgets/Header/index';
import './TasksPage.scss';
import Footer from '../../../widgets/Footer/ui/Footer';

const TasksPage = () => {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <TasksWorkspace />
      </main>
      <Footer />
    </>
  );
};

export default TasksPage;
