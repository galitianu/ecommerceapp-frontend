import React from "react";
import styles from "./CategoryBanner.module.css";
import { Category } from "../../../types/entities";
import Image from "next/image";
import Link from "next/link";

interface CategoryBannerProps {
  category: Category;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ category }) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={styles.categoryBannerLink}
    >
      <div className={styles.categoryBannerContainer}>
        <div className={styles.categoryBannerImageWrapper}>
          <Image
            src={category.image}
            alt={category.name}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2>{category.name.toUpperCase()}</h2>
        <button className={styles.categoryBannerButton}>
          SHOP
          <Image
            src="/assets/shared/desktop/icon-arrow-right.svg"
            alt="Arrow Right"
            width={5}
            height={10}
          />
        </button>
      </div>
    </Link>
  );
};

export default CategoryBanner;
