import UploadStep from "../../widgets/Hero/Steps/Upload";
import ProcessingStep from "../../widgets/Hero/Steps/Processing";
import ResultStep from "../../widgets/Hero/Steps/Result";

export const stepConfig = {
  upload: {
    component: UploadStep,
    title: 'Превращаем речь в текст — легко, быстро, точно.',
    showNavigation: true,
  },
  processing: {
    component: ProcessingStep,
    title: 'Обрабатываем ваш файл...',
    showNavigation: false,
  },
  result: {
    component: ResultStep,
    title: 'Результат перевода',
    showNavigation: true,
  }
}