import React from "react";
import { useRouter } from "next/navigation";
import styles from "./OptionCard.module.css";
import Image from "next/image";
import Button, { ButtonType } from "../common/Button/Button";

interface OptionCardProps {
  name: string;
  description: string;
  icon: string;
  route: string;
  buttonText: string;
}

const OptionCard: React.FC<OptionCardProps> = ({
  name,
  description,
  icon,
  route,
  buttonText,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(route);
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <Image
          src={icon}
          alt={name}
          className={styles.icon}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            buttonType={ButtonType.PRIMARY}
            text={buttonText}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
