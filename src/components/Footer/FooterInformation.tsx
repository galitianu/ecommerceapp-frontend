import React from "react";
import styles from "./FooterInformation.module.css";
import Image from "next/image";
import Link from "next/link";
import companyData from "@/utils/companyData";

function FooterInformation() {
  const { facebook, instagram, twitter } = companyData.socialMedia;
  const { email, phone } = companyData.contact;

  return (
    <div className={styles.footerInformation}>
      <p className={[styles.footerParagraph, styles.footerText].join(" ")}>
        {companyData.footerText}
      </p>
      <p className={[styles.footerCopyright, styles.footerText].join(" ")}>
        {companyData.copyright}
      </p>
      <div className={styles.footerSocialMedia}>
        {facebook && (
          <Link href={facebook}>
            <Image
              src="/assets/shared/desktop/icon-facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </Link>
        )}
        {instagram && (
          <Link href={instagram}>
            <Image
              src="/assets/shared/desktop/icon-instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
        )}
        {twitter && (
          <Link href={twitter}>
            <Image
              src="/assets/shared/desktop/icon-twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
            />
          </Link>
        )}
        {email && (
          <a href={`mailto:${email}`} className={styles.footerIconLink}>
            <Image
              src="/assets/shared/desktop/icon-mail.svg"
              alt="Email"
              width={30}
              height={30}
            />
          </a>
        )}
        {phone && (
          <a href={`tel:${phone}`} className={styles.footerIconLink}>
            <Image
              src="/assets/shared/desktop/icon-phone.svg"
              alt="Phone"
              width={30}
              height={30}
            />
          </a>
        )}
      </div>
      <div className={styles.break}>
        <br />
      </div>
    </div>
  );
}

export default FooterInformation;
