"use client";

import React from "react";
import styles from "./CategoryLinks.module.css";
import LinksList from "./Links/LinksList";
import { useCategories } from "../../../contexts/CategoryContext";

const CategoryLinks: React.FC = () => {
  const { categories } = useCategories();
  const withHome = [
    { name: "home", slug: "", image: "", id: "home", link: "/" },
    ...categories,
  ];

  return (
    <div className={styles.linksContainer}>
      <LinksList links={withHome} />
    </div>
  );
};

export default CategoryLinks;
