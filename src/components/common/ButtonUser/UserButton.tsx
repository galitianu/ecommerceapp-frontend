import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./UserButton.module.css";
import { usePersonContext } from "@/contexts/PersonContext";
import { useSession } from "next-auth/react";

function UserButton() {
  const { person } = usePersonContext();
  const { data: session, status } = useSession();

  const IconSrc =
    !session && status === "unauthenticated"
      ? "/assets/shared/desktop/icon-user-unknown.svg"
      : "/assets/shared/desktop/icon-user.svg";

  const paragraphContent =
    !session && status === "unauthenticated" ? "Sign in" : person?.firstName;
  return (
    <Link href="/auth" className={styles.linkWrapper}>
      <p style={{ marginRight: "0" }}>{paragraphContent}</p>
      <Image
        src={IconSrc}
        alt="User"
        width={28}
        height={28}
        sizes="(max-width: 640px) mobile, (max-width: 1024px) tablet, desktop"
        className={styles.userIcon}
      />
    </Link>
  );
}

export default UserButton;
