import classNames from 'clsx';

import './Button.scss';
import type { ClassNameInterface } from '../../../types/ClassNameInterface.ts';
import type { ButtonHTMLAttributes, FC } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ClassNameInterface {}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={classNames('button', [className])}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
