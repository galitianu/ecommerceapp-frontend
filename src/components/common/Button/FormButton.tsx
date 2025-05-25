import React from "react";
import { useFormContext } from "react-hook-form";
import Button from "./Button";

interface ButtonSeeProductProps {
  onClick: any;
  text: string;
}

const FormButton: React.FC<ButtonSeeProductProps> = ({ onClick, text }) => {
  const methods = useFormContext();
  return <Button onClick={methods.handleSubmit(onClick)} text={text} />;
};

export default FormButton;
