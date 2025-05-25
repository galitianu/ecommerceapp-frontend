"use client";
import React from "react";
import styles from "@/components/Auth/Auth.module.css";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import Link from "next/link";
import useBlockPublic from "@/hooks/useBlockPublic";
import companyData from "@/utils/companyData";

export default function ResetPassword() {
  useBlockPublic();

  const resetPassword = () => {
    console.log("resetPassword");
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
        <h1>Reset Password</h1>
        <h2>Enter your registered email.</h2>
        <Button onClick={resetPassword} text="Reset Password" />
        <Link href="auth">
          <p>Login screen</p>
        </Link>
      </div>
    </div>
  );
}
