"use client";

import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import CategoryLinks from "../common/CategoryLinks/CategoryLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  navBarIsOpen: boolean;
  toggleMenu: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ navBarIsOpen, toggleMenu }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewPortWidth = () => {
      const desktopSize = window.innerWidth >= 1024;

      setIsDesktop(desktopSize);

      // If it's desktop, call toggleMenu to set navBarIsOpen to false if it isn't already
      if (desktopSize && navBarIsOpen) {
        toggleMenu();
      }
    };

    updateViewPortWidth(); // Initial check
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [navBarIsOpen, toggleMenu]);

  return (
    <>
      {isDesktop ? (
        <CategoryLinks />
      ) : (
        <button onClick={toggleMenu} className={styles.hamburgerButton}>
          <FontAwesomeIcon icon={navBarIsOpen ? faTimes : faBars} />
        </button>
      )}
    </>
  );
};

export default NavBar;
