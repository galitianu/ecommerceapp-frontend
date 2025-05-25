import React from "react";
import styles from "./Button.module.css";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TEXT = "text",
  DANGER = "danger",
}

interface ButtonProps {
  onClick?: any;
  text: string;
  buttonType?: ButtonType;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  buttonType = ButtonType.PRIMARY,
  type,
}) => {
  let className = "";
  switch (buttonType) {
    case ButtonType.PRIMARY:
      className = `${styles.button}`;
      break;
    case ButtonType.SECONDARY:
      className = `${styles.secondary}`;
      break;
    case ButtonType.TEXT:
      className = `${styles.text}`;
      break;
    case ButtonType.DANGER:
      className = styles.danger;
      break;
    default:
      className = `${styles.button}`;
      break;
  }

  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
