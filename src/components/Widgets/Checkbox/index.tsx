// import { Type } from "@/types/prefillerType";
import { Fragment, MutableRefObject } from "react";

interface CheckboxProps {
  className?: string;
  type: string;
  name: string;
  value: string | number;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  setValue?: (value: string | boolean | number) => void;
  checkBoxInputRef?: MutableRefObject<HTMLInputElement[]>;
  // /* eslint-disable  @typescript-eslint/no-explicit-any */
  inputFormHook?: any;
  index?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  type,
  name,
  id,
  value,
  checked,
  disabled,
  setValue,
  checkBoxInputRef,
  inputFormHook,
  index,
}) => {
  return (
    <Fragment>
      {inputFormHook ? (
        <input
          {...inputFormHook}
          disabled={disabled}
          checked={checked}
          type={type}
          id={id}
          className={`form-check-input h-5 w-5 ${className} `}
        />
      ) : (
        <input
          className={`form-check-input h-5 w-5 ${className} `}
          type={type}
          name={name}
          value={value}
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={(e) => setValue?.(e.target.checked)}
          ref={(element) => {
            checkBoxInputRef !== undefined &&
              (checkBoxInputRef!.current[index!] = element!);
          }}
        />
      )}
    </Fragment>
  );
};

export default Checkbox;
