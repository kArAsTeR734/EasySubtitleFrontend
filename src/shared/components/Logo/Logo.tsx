import type { FC } from 'react';
import type { LogoProps } from './types.ts';
import { clsx } from 'clsx';
import logoSrc from '@assets/Logo.svg'; // ← импортируем изображение

export const Logo: FC<LogoProps> = ({ loading = 'lazy', className }) => {
  const title = 'Home';

  return (
    <>
      <a
        className={clsx('logo', className)}
        href="/"
        title={title}
        aria-label={title}
      >
        <img
          className="logo__image"
          src={logoSrc}
          alt="logo"
          width={230}
          height={60}
          loading={loading}
        />
      </a>
    </>
  );
};
