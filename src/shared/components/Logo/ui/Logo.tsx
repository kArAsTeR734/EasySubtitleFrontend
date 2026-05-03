import type { FC } from 'react';
import type { LogoProps } from '../types';
import { clsx } from 'clsx';
import Logotype from '../../../../assets/Logo.svg?react';

export const Logo: FC<LogoProps> = ({ className }) => {
  const title = 'Home';

  return (
    <>
      <a
        className={clsx('logo', className)}
        href="/public"
        title={title}
        aria-label={title}
      >
        <Logotype/>
      </a>
    </>
  );
};
