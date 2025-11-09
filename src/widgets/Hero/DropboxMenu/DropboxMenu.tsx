import './DropboxMenu.scss'
import React, {useState} from "react";
import clsx from "clsx";
import UploadButton from "../../../shared/components/UploadButton";

export interface DropboxMenuProps {
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  className?: string;
}

export const DropboxMenu: React.FC<DropboxMenuProps> = ({
    onFileUpload,
    acceptedFileTypes = ".wav",
    maxFileSize = 1024 * 1024 * 1024 * 5,
    className = ''
  }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelect = (files: FileList | null): void => {
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
      <div className={clsx('dropbox-menu', className)}>
        <div
            className={clsx('dropbox-menu__wrapper', {'drag-over': isDragOver})}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
          <p className="dropbox-menu__hint">
            Перетащите файлы сюда или нажмите для выбора
          </p>
          <UploadButton
              fileName={fileName}
              setFileName={setFileName}
              acceptedFileTypes={acceptedFileTypes}
              onFileUpload={onFileUpload}
              maxFileSize={maxFileSize}
          />
        </div>
      </div>
  );
};
