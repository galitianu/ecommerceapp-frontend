import React from "react";
import styles from "@/components/Admin/EntityCard.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { Category } from "@/types/entities";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (slug: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      <h3>{category.name}</h3>
      <div className={styles.image}>
        <Image
          src={category.image}
          alt={category.name}
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
          onClick={() => onEdit(category)}
        />
        <Button
          buttonType={ButtonType.DANGER}
          text="Disable"
          onClick={() => onDelete(category.id)}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
