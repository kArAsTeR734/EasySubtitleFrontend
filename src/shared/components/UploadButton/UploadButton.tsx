import {useRef, type FC} from 'react';
import Button from "../Button";
import clsx from "clsx";

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
  maxFileSize = 100 * 1024 * 1024,
  fileName,
  setFileName,
  className = ''
  }) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
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
            className={clsx('button button--upload-file h6', {'has-file': fileName})}
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