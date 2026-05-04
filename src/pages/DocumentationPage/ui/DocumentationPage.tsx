import Header from '@widgets/Header/index.ts';
import TranscriptionInstruction from '@widgets/Hero/TranscriptionInstruction/index.ts';
import Footer from '@widgets/Footer/ui/Footer.tsx';
import './DocumentationPage.scss'

const DocumentationPage = ()=> {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="page-content">
          <main className="main-content">
            <TranscriptionInstruction />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DocumentationPage;