import React, {useState, useRef} from 'react';
import Button from "../Button";
import clsx from "clsx";

interface UploadButtonProps {
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string;
  className?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
    onFileUpload,
    acceptedFileTypes = ".mp4,.avi,.mov,.wav,.mp3,.m4a",
    className = ''
  }) => {
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      console.log('Выбран файл:', file);

      onFileUpload(file);
    }
  };

  return (
      <div className={clsx('file-upload', className)}>
        <Button
            type="button"
            className={clsx('button button--upload-file h6', { 'has-file': fileName })}
            onClick={handleButtonClick}
        >
          {fileName ? `Файл: ${fileName}` : 'Загрузить файл'}
        </Button>
      </div>
  );
};