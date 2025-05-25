import React from "react";
import styles from "@/components/Admin/EntityCard.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { ProductDTO } from "@/types/dto";
import Image from "next/image";

interface EnableProductCardProps {
  product: ProductDTO;
  onEnable: (id: string) => void;
}

const EnableProductCard: React.FC<EnableProductCardProps> = ({
  product,
  onEnable,
}) => {
  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      <div className={styles.image}>
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          buttonType={ButtonType.PRIMARY}
          text="Enable"
          onClick={() => onEnable(product.id)}
        />
      </div>
    </div>
  );
};

export default EnableProductCard;
