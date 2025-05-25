import React from "react";
import styles from "@/components/Admin/EntityCard.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { CategoryDTO } from "@/types/dto";
import Image from "next/image";

interface EnableCategoryCardProps {
  category: CategoryDTO;
  onEnable: (categoryId: string) => void;
}

const EnableCategoryCard: React.FC<EnableCategoryCardProps> = ({
  category,
  onEnable,
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
          onClick={() => onEnable(category.id)}
        />
      </div>
    </div>
  );
};

export default EnableCategoryCard;
