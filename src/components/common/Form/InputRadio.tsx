import React from "react";
import styles from "./Form.module.css";
import { useFormContext } from "react-hook-form";

type Props<T extends Record<string, string>> = {
  name: string;
  label: string;
  options: T;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputRadio = <T extends Record<string, string>>({
  name,
  label,
  options,
  onChange,
}: Props<T>) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  return (
    <div
      className={`${styles.formInput} ${errors[name] ? styles.inputError : ""}`}
    >
      <div
        style={{ marginBottom: "1rem" }}
        className={styles.labelNameAndError}
      >
        <label htmlFor={name}>{label}</label>
        {errors[name] && <p>{errors[name]?.message as string}</p>}
      </div>
      <div className={styles.categoryContent}>
        {Object.entries(options).map(([key, value]) => (
          <div
            className={`${styles.radioInput} ${
              errors[name] ? styles.inputErrorRadioInput : ""
            }`}
            key={key}
          >
            <label className={styles.radioOption}>
              <input
                {...register(name)}
                type="radio"
                value={key}
                name={name}
                onChange={onChange}
              />
              <span></span>
              <p>{value}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputRadio;
