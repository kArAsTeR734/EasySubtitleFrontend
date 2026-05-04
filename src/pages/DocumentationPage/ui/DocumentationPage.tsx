import Header from '@widgets/Header/index.ts';
import TranscriptionInstruction from '@widgets/Hero/TranscriptionInstruction/index.ts';
import Footer from '@widgets/Footer/ui/Footer.tsx';
import './DocumentationPage.scss'

const DocumentationPage = ()=> {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <TranscriptionInstruction />
      </main>
      <Footer />
    </>
  );
}

export default DocumentationPage;