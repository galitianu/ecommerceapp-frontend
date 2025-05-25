import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  defaultValues: any;
  resolver: any;
  onSubmit: any;
  className: string;
};

const Form: React.FC<Props> = ({
  children,
  defaultValues,
  resolver,
  onSubmit,
  className,
}) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
