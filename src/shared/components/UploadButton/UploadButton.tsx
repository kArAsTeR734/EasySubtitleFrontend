import {useRef, type FC} from 'react';
import Button from "../Button";
import clsx from "clsx";
import {useAuth} from "../../hooks/useTokenCheck.ts";

interface UploadButtonProps {
  onFileUpload: (file: File) => void,
  acceptedFileTypes?: string,
  className?: string,
  fileName: string,
  setFileName: (fileName: string) => void,
  maxFileSize?: number
}

export const UploadButton: FC<UploadButtonProps> = ({
  onFileUpload,
  acceptedFileTypes = ".wav",
  maxFileSize = 1024 * 1024 * 1024 * 5,
  fileName,
  setFileName,
  className = ''
  }) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {isLoggedIn} = useAuth();

  const handleButtonClick = () => {
    if(!isLoggedIn){
      alert('Зарегистрируйтесь для добавления фалов для перевода');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelect = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > maxFileSize) {
      alert(`Файл слишком большой. Максимальный размер: ${maxFileSize / 1024 / 1024}MB`);
      return;
    }

    setFileName(file.name);
    onFileUpload(file);
  };

  return (
      <div className={clsx('file-upload', className)}>
        <Button
            type="button"
            className={clsx('button button--upload-file h6', {'has-file': fileName},{'disabled':!isLoggedIn})}
            onClick={handleButtonClick}
        >
          {fileName ? `Файл: ${fileName}` : 'Загрузить файл'}
        </Button>

        <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="visually-hidden"
            accept={acceptedFileTypes}
        />
      </div>
  );
};