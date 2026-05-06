import Header from '@widgets/Header/index.ts';
import DocumentationWorkspace from '@widgets/Hero/DocumentationWorkspace/index.ts';
import Footer from '@widgets/Footer/ui/Footer.tsx';
import './DocumentationPage.scss'

const DocumentationPage = ()=> {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <DocumentationWorkspace />
      </main>
      <Footer />
    </>
  );
}

export default DocumentationPage;