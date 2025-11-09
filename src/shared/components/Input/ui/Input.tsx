import type {HTMLInputProps} from "../types.ts";


export interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  fullWidth?: boolean
  fullHeight?: boolean
}

export const Input = () => {
  return (
      <div>

      </div>
  );
};

