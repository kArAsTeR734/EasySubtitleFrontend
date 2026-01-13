import type { ClassNameInterface } from '../../types/ClassNameInterface.ts';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';

export type LogoProps = ClassNameInterface &
  HTMLAttributes<HTMLElement> & {
    loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  };
