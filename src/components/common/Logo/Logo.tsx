import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";
import companyData from "@/utils/companyData";

function Logo() {
  return (
    <div>
      <Link href="/" className={styles.logo}>
        <Image
          src={companyData.images.logo}
          alt="logo"
          width={75}
          height={75}
          quality={100}
          className={styles.logoImage}
        />
        <p>
          Papa<span className={styles.roGradient}>RO</span>
        </p>
      </Link>
    </div>
  );
}

export default Logo;
