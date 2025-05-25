import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./InformationIcon.module.css";

interface InformationIconProps {
  content: string;
}

const InformationIcon: React.FC<InformationIconProps> = ({ content }) => {
  return (
    <div className={styles.informationIconContainer}>
      <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
      <div className={styles.tooltip}>{content}</div>
    </div>
  );
};

export default InformationIcon;
