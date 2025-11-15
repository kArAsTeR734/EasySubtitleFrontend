import clsx from "clsx";
import React, {type FC, type ReactNode, useCallback, useEffect, useState} from "react";
import './Modal.scss'

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
    className,
    children,
    isOpen,
    onClose
  }) => {
  const [isMounted, setIsMounted] = useState(false);

  const mods: Record<string, boolean | undefined> = {
    ['opened']: isOpen,
  };

  const closeHandler = useCallback(() => {
    onClose?.();
  },[isMounted]);

  const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeHandler();
        }
      },
      [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (!isMounted) return null

  return (
      <>
        <div className={clsx('modal-overlay', {'opened': isOpen})} onClick={closeHandler}>
          <div className={clsx('modal', mods, [className])}>
            <div className='modal__content' onClick={onContentClick}>
              {children}
            </div>
          </div>
        </div>
      </>

  );
};