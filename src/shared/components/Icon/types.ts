import type { ClassNameInterface } from '../../types/ClassNameInterface.ts';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';

export type IconProps = ClassNameInterface & HTMLAttributes<HTMLElement> & ImgHTMLAttributes<HTMLImageElement>;
