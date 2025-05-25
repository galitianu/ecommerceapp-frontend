import React from "react";
import styles from "./Form.module.css";
import { useFormContext } from "react-hook-form";

type FormStyles = typeof styles;

type Props = {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  readOnly?: boolean;
};

const generateInputStyles = (
  styles: FormStyles,
  errors: Record<string, any>,
  name: string,
  readOnly?: boolean
) => {
  let inputStyles = styles.formInput;

  if (errors[name]) {
    inputStyles += " " + styles.inputError;
  }

  if (readOnly) {
    inputStyles += " " + styles.formInputFilled;
  }

  return inputStyles;
};

const InputForm: React.FC<Props> = ({
  name,
  placeholder,
  type,
  label,
  readOnly = false,
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const inputStyles = generateInputStyles(styles, errors, name, readOnly);

  return (
    <div className={inputStyles}>
      <div className={styles.labelNameAndError}>
        <label htmlFor={name}>{label}</label>
        {errors[name] && <p>{errors[name]?.message as string}</p>}
      </div>
      <input
        {...register(name)}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputForm;
