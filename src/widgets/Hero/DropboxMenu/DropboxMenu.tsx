import './DropboxMenu.scss'
import React, {useRef, useState} from "react";
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
   acceptedFileTypes = ".mp4,.avi,.mov,.wav,.mp3,.m4a",
   maxFileSize = 100 * 1024 * 1024, // 100MB по умолчанию
   className = ''
 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null): void => {
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
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
            onClick={handleButtonClick}
        >
          <p className="dropbox-menu__hint">
            Перетащите файлы сюда или нажмите для выбора
          </p>
          <UploadButton
              onFileUpload={onFileUpload}
              acceptedFileTypes={acceptedFileTypes}
          />

          <input
              ref={fileInputRef}
              type="file"
              max={maxFileSize}
              onChange={(e) => handleFileSelect(e.target.files)}
              accept={acceptedFileTypes}
              className="visually-hidden"
          />
        </div>
      </div>
  );
};
