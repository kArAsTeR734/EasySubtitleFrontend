import InstructionList from "./InstructionList/InstructionList.tsx";

export const TranscriptionInstruction = () => {

  const instructionItems = [
    {
      id:1,
      title:'Загрузите аудиофайл',
      description:'Перетащите файл в назначенную область или нажмите на кнопку “Загрузить". Наш основной формат .wav файлы'
    },
    {
      id:2,
      title:'Переводите',
      description:'Нажмите на кнопку "Далее" и мы переведём видео или аудио в текст'
    },
    {
      id:3,
      title:'Скачайте полученный перевод',
      description:'Вы можете загрузить перевод на своё устройство в .docx, .pdf, или .txt формате. Нажмите на кнопку “Скачать”'
    }
  ]

  return (
      <>
        <div className="instruction" id="instructions">
          <h2 className="instruction__title h3">Получите готовый текст за 3 простых шага</h2>
          <InstructionList instructions={instructionItems}/>
        </div>
      </>
  );
};

