"use client";

import React from "react";
import styles from "./CategoriesBanners.module.css";
import { useCategories } from "../../../contexts/CategoryContext";
import CategoryBanner from "./CategoryBanner"; // Adjust the path if needed

function CategoriesBanners() {
  const { categories } = useCategories();

  return (
    <div className={styles.categoriesBanners}>
      {categories.map((category) => (
        <CategoryBanner key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesBanners;
