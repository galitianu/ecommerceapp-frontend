"use client";
import React from "react";
import styles from "@/components/Auth/Auth.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import registrationSchema from "@/components/Auth/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "@/components/common/Form/InputForm";
import Form from "@/components/common/Form/Form";
import FormButton from "@/components/common/Button/FormButton";
import { createUser } from "@/services/userService";
import toast from "react-hot-toast";
import useBlockPublic from "@/hooks/useBlockPublic";
import companyData from "@/utils/companyData";

type FormData = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  useBlockPublic();

  const router = useRouter();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const resolver = yupResolver(registrationSchema);

  const onSubmit = async (data: FormData) => {
    try {
      const user = await createUser(
        data.lastName,
        data.firstName,
        data.email,
        data.password
      );

      if (user) {
        toast.success("User created successfully.");
        router.push("/auth");
      } else {
        toast.error("Error creating user.");
      }
    } catch (error) {
      toast.error("User already exists.");
    }
  };

  return (
    <div className={styles.authCardWrapper}>
      <div className={styles.authCardPicture}>
        <Image
          src={companyData.images.auth}
          alt="login image"
          fill={true}
          style={{ objectFit: "cover" }}
          priority={true}
          quality={100}
        />
      </div>
      <div className={styles.authCard}>
        <h1>Register</h1>
        <Form
          className=""
          defaultValues={defaultValues}
          resolver={resolver}
          onSubmit={onSubmit}
        >
          <div className={styles.inputFormWrapper}>
            <InputForm
              name="firstName"
              placeholder="First Name"
              type="text"
              label="First Name"
            />
            <InputForm
              name="lastName"
              placeholder="Last Name"
              type="text"
              label="Last Name"
            />
            <InputForm
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
            <InputForm
              name="confirmPassword"
              placeholder="Confirm"
              type="password"
              label="Confirm Password"
            />
            <InputForm
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
            />
          </div>
          <div className={styles.formButton}>
            <FormButton text="Register" onClick={onSubmit} />
          </div>
        </Form>
        <Link href="auth">
          <p>Already have an account? Sign In</p>
        </Link>
      </div>
    </div>
  );
}
