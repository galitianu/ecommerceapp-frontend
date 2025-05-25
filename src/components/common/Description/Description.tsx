import React from "react";
import styles from "./Description.module.css";
import DescriptionImage from "./DescriptionImage";
import companyData from "@/utils/companyData";

function Description() {
  const parts = companyData.descriptionHeading.split("you");

  const descriptionHeadingWithStyle = parts.map((part, index) => {
    return (
      <React.Fragment key={index}>
        {index > 0 && <span className={styles.highlighted}>you</span>}
        {part}
      </React.Fragment>
    );
  });

  return (
    <div className={styles.description}>
      <DescriptionImage />
      <div className={styles.descriptionText}>
        <h2>{descriptionHeadingWithStyle}</h2>
        <p>{companyData.description}</p>
      </div>
    </div>
  );
}

export default Description;
