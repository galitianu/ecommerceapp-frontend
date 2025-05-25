import React from "react";
import styles from "./ErrorCard.module.css";

function ErrorCard() {
  return (
    <div className={styles.errorCard}>
      <h1>
        Oops! Something went <span className={styles.highlighted}>wrong</span>
        ...
      </h1>
    </div>
  );
}

export default ErrorCard;
