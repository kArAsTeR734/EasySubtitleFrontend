import { useEffect, useState, type RefObject } from 'react';

export const useHover = <T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>): boolean => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const on = () => setIsHovering(true);
  const off = () => setIsHovering(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;

    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);

    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
    };
  }, [ref]);

  return isHovering;
};
