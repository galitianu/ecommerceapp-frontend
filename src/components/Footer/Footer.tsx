import React from "react";
import styles from "./Footer.module.css";
import Logo from "../common/Logo/Logo";
import CategoryLinks from "../common/CategoryLinks/CategoryLinks";
import FooterInformation from "./FooterInformation";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLine} />
      <div className={styles.footerLogoAndLinks}>
        <Logo />
        <CategoryLinks />
      </div>
      <FooterInformation />
    </div>
  );
}

export default Footer;
