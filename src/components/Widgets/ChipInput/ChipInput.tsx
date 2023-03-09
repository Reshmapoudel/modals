// import { buttonHoverChildVarient } from "@/variants/common";
import { Close, Search } from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./ChipInput.module.css";
import { motion } from "framer-motion";
import classNames from "classnames";
import ErrorMessage from "@/components/Globals/ErrorMessage";

interface ChipInputProps {
  value: Array<string>;
  inputplaceholder?: string;
  className?: string;
  chipClassName?: string;
  maxNumber?: number;
  pattern?: string;
  type?: string;
  validation?: Array<(value: string) => { validate: boolean; message: string }>;
  setValue: (newValue: Array<string>) => void;
}

export const ChipInput: React.FC<ChipInputProps> = ({
  value = [],
  setValue,
  className = "",
  type = "text",
  chipClassName = "",
  validation = [],
  maxNumber,
  pattern = "*",
  inputplaceholder = "Type here",
}) => {
  // start of useState
  const [inputText, setInputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  //   end of useState

  //start of function
  const handleKeyDown = (event: { key: string }) => {
    if (event.key == "Enter" && inputText && validateEnteredInput(inputText)) {
      const emailListValues = [...value];
      emailListValues.push(inputText);
      setValue(emailListValues);
      setInputText("");
    }
  };

  const removeElement = (index: number) => {
    const newArray = [...value];
    newArray.splice(index, 1);
    setValue(newArray);
  };

  const validateEnteredInput: CallableFunction = (value: string): boolean => {
    setError(null);
    let flag = true;

    validation.forEach((validation) => {
      const validateMessage = validation(value);
      console.log(validateMessage);
      if (!validateMessage.validate) {
        flag = false;
        setError(validateMessage.message);
        return null;
      }
    });

    return flag;
  };
  //   end of functions
  return (
    <div className="">
      <div
        className={classNames(
          "flex flex-wrap gap-2",
          styles.chip_input_main,
          className
        )}
      >
        {value.map((valueData, index) => {
          return (
            <div
              className={classNames(
                styles.element_chip,
                chipClassName || styles.element_chip_green
              )}
              key={`selectable_chip_${valueData}_${index}`}
            >
              <div className={styles.element_chip_text}>{valueData}</div>
              <div className={styles.close_item}>
                <Close
                  onClick={(event) => {
                    removeElement(index), event.stopPropagation();
                  }}
                  width={1}
                  height={1}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    marginLeft: "10px",
                    color: "#666666",
                    borderRadius: "100%",
                    background: "white",
                  }}
                ></Close>
              </div>
            </div>
          );
        })}
        <div
          className={classNames(
            styles.chip_input_container,
            className,
            "relative flex-grow"
          )}
        >
          {/* <div className={styles.input_container_prefix_icon}>
          <Search />
        </div> */}
          <input
            type={type}
            className={styles.chip_input_box}
            placeholder={inputplaceholder}
            value={inputText}
            pattern={pattern}
            onKeyUp={handleKeyDown}
            onChange={(value) => setInputText(value.target.value)}
          />
        </div>
      </div>
      <ErrorMessage error={error}></ErrorMessage>
    </div>
  );
};
