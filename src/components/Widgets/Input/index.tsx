import styles from "./Input.module.css";
import classNames from "classnames";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Fragment, KeyboardEvent } from "react";
interface InputProps {
  className?: string;
  wrapperClassName?: string;
  type: string;
  placeholder: string;
  value?: string | number;
  defaultValue?: string;
  error?: string[] | string | undefined;
  label?: string | undefined;
  disabled?: boolean;
  setValue?: (str: string) => void;
  onBlur?: (str: string) => void;
  // /* eslint-disable  @typescript-eslint/no-explicit-any */
  inputFormHook?: any;
  handleKeyDown?: (event: KeyboardEvent) => void;
  minValue?: number | string;
  maxValue?: number | string;
  step?: number | string;
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  placeholder,
  value,
  maxValue = undefined,
  minValue = undefined,
  step = undefined,
  error,
  label,
  disabled,
  setValue,
  inputFormHook,
  onBlur,
  handleKeyDown,
  defaultValue,
}) => {
  return (
    <Fragment>
      {label && (
        <label className="block mb-2 text-sm text-gray-600">{label}</label>
      )}

      {inputFormHook ? (
        <input
          {...inputFormHook}
          defaultValue={value}
          // value={value}
          type={type}
          className={classNames(
            `block w-full  rounded-md border text-blueGray-600  p-2  text-md ${className} ${styles.rtInput}`,
            { "border-red-500": error }
          )}
          placeholder={placeholder}
          min={minValue}
          max={maxValue}
          step={step}
        />
      ) : (
        <input
          // defaultValue={value ??""}
          type={type}
          className={classNames(
            `block w-full  rounded-md border text-blueGray-600  p-2  text-md ${className} ${styles.rtInput}`,
            { "border-red-500": error }
          )}
          placeholder={placeholder}
          value={value}
          min={minValue}
          max={maxValue}
          step={step}
          onChange={(e) => setValue!(e.target.value)}
          onBlur={(e) => onBlur !== undefined && onBlur!(e.target.value)}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          defaultValue={defaultValue}
        />
      )}
      <small className="font-medium text-red-800">{error}</small>
    </Fragment>
  );
};

export default Input;
