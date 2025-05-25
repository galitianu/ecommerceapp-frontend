"use client";

import { useUserContext } from "@/contexts/UserContext";

import styles from "@/components/Auth/Auth.module.css";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import Link from "next/link";
import useRequireAuth from "@/hooks/useRequireAuth";
import companyData from "@/utils/companyData";
import useCheckAdmin from "@/hooks/useCheckAdmin";

export default function Auth() {
  const { user } = useUserContext();
  const isAdmin = useCheckAdmin();
  console.log(isAdmin);

  useRequireAuth();

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
        <h1>Sign Out</h1>
        <h2>You are already signed in as {user?.username}.</h2>
        <Button text="Sign Out" onClick={() => signOut()} />
        <Link href="orders">
          <p>View Order History</p>
        </Link>
        {isAdmin.isAdmin && (
          <Link href="/admin">
            <p>Go to Admin Panel</p>
          </Link>
        )}
      </div>
    </div>
  );
}
