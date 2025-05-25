import React from "react";
import styles from "./HeroCard.module.css";
import Image from "next/image";
import Link from "next/link";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { Product } from "@/types/entities";
import companyData from "@/utils/companyData";

interface HeroCardProps {
  heroProduct: Product | null;
}

const HeroCard: React.FC<HeroCardProps> = ({ heroProduct }) => {
  if (!heroProduct) return <></>;

  return (
    <div className={styles.heroCardWrapper}>
      <div className={styles.heroCard}>
        <div className={styles.heroImage}>
          <Image
            src={heroProduct.baseImage}
            alt="Chef's Special"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
            quality={100}
          />
        </div>
        <div className={styles.heroTextContent}>
          <h3>{companyData.heroHeading}</h3>
          <h1>{companyData.heroHeading}</h1>
          <p>{companyData.heroText}</p>
          <div className={styles.heroButton}>
            <Link
              style={{ textDecoration: "none" }}
              href={`product/${heroProduct.slug}`}
            >
              <Button buttonType={ButtonType.PRIMARY} text="SEE PRODUCT" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
