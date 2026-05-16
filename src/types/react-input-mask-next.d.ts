declare module "react-input-mask-next" {
  import type { InputHTMLAttributes, ReactElement } from "react";

  type InputMaskProps = InputHTMLAttributes<HTMLInputElement> & {
    mask: string;
    maskPlaceholder?: string | null;
    alwaysShowMask?: boolean;
    children?: ReactElement;
  };

  export default function InputMask(props: InputMaskProps): ReactElement;
}
