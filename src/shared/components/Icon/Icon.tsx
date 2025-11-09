import clsx from "clsx";
import type {IconProps} from "./types.ts";
import type {FC} from "react";

export const Icon:FC<IconProps> = ({className}) => {
  const ariaLabel = ''
  return (
      <span className={clsx('icon', className)} aria-label={ariaLabel}>
      <img
          src={}
          alt={}
      />
    </span>
  );
};

