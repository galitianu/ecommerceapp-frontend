"use client";
import styles from "@/components/Auth/Auth.module.css";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import useBlockPublic from "@/hooks/useBlockPublic";
import companyData from "@/utils/companyData";

export default function Auth() {
  const signInUsingKeyCloak = async () => {
    signIn("keycloak", { redirect: false });
  };

  useBlockPublic();

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
        <h1>Sign In</h1>
        <h2>Login using your registered info.</h2>
        <Button onClick={signInUsingKeyCloak} text="Sign In using Keycloak" />
        {/* <Link href="resetPassword">
          <p>Forgot password?</p>
        </Link> */}
        <Link href="register">
          <p>New here? Register</p>
        </Link>
      </div>
    </div>
  );
}
function useAuthenticationRedirect(status: string) {
  throw new Error("Function not implemented.");
}
