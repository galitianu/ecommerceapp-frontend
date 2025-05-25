import React from "react";
import Link from "next/link";
import styles from "./LinksList.module.css";

type props = {
  links: { name: string; link: string }[];
};

const LinksList: React.FC<props> = (props) => {
  return (
    <>
      {props.links.map((link) => (
        <Link
          className={styles.categoryLink}
          key={link.link}
          href={`${link.link}`}
        >
          {link.name.toUpperCase()}
        </Link>
      ))}
    </>
  );
};

export default LinksList;
