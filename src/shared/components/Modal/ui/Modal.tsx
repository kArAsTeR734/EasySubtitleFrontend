import Portal from "../../Portal";
import {
  type FC,
  type ReactNode, useCallback, useEffect,
  useState
} from "react";
import clsx from "clsx";
import './Modal.scss'

interface ModalProps {
  className?: string,
  children?: ReactNode,
  isOpen:boolean,
}

export const Modal: FC<ModalProps> = ({
    className,
    children,
    isOpen
   }) => {

  const [isMounted, setIsMounted] = useState(false)

  const mods: Record<string, boolean | undefined> = {
    ['opened']: isOpen,
  }

  const closeHandler = () => {
  }

  const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeHandler()
        }
      },
      [closeHandler]
  )

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
      <Portal>
        <div className={clsx('modal',mods, [className])}>
          <div className='overlay' onClick={closeHandler}>
              {children}
          </div>
        </div>
      </Portal>
  );
};

