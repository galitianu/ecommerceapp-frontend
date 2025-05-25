import React from "react";
import styles from "@/components/Admin/EntityCard.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { ProductDTO } from "@/types/dto"; // Import the DTO type
import Image from "next/image";

interface ProductCardProps {
  product: ProductDTO;
  onEdit: (product: ProductDTO) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
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
      <div className={styles.buttonContainer}>
        <Button
          buttonType={ButtonType.SECONDARY}
          text="Edit"
          onClick={() => onEdit(product)}
        />
        <Button
          buttonType={ButtonType.DANGER}
          text="Disable"
          onClick={() => onDelete(product.id)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
