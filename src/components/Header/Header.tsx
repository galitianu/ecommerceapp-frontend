"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";
import Logo from "../common/Logo/Logo";
import NavBar from "./NavBar";
import CategoriesBanners from "../common/CategoriesBanners/CategoriesBanners";
import CartButton from "../common/CartButton";
import UserButton from "../common/ButtonUser/UserButton";
import CartContent from "../common/CartContent/CartContent";

function Header() {
  const [navBarIsOpen, setnavBarIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    if (!isCartOpen) {
      setnavBarIsOpen(!navBarIsOpen);
    }
  };

  const toggleCart = () => {
    if (!navBarIsOpen) {
      setIsCartOpen(!isCartOpen);
    }
  };

  const resetNavBarAndCart = () => {
    if (navBarIsOpen) {
      setnavBarIsOpen(false);
    }
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  };

  return (
    <>
      <div className={navBarIsOpen || isCartOpen ? styles.blurEffect : ""} />
      <div className={styles.header} onClick={resetNavBarAndCart}>
        <div className={styles.navBar}>
          <NavBar navBarIsOpen={navBarIsOpen} toggleMenu={toggleMenu} />
        </div>
        <div className={styles.headerLogo}>
          <Logo />
        </div>
        <div className={styles.ButtonsWrapper}>
          <div className={styles.userBannerPreventMobile}>
            <UserButton />
          </div>
          <CartButton toggleCart={toggleCart} />
        </div>
      </div>
      <div className={styles.positionedContent}>
        {isCartOpen && (
          <div
            className={`${styles.overlayContent} ${styles.overlayContentCart}`}
          >
            {" "}
            <CartContent setIsCartOpen={setIsCartOpen} />
          </div>
        )}
        {navBarIsOpen && (
          <div className={styles.overlayContent} onClick={resetNavBarAndCart}>
            <div className={styles.userBannerPreventDesktop}>
              <UserButton />
            </div>
            <CategoriesBanners />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
