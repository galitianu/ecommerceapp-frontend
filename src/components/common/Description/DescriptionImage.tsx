"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./DescriptionImage.module.css";
import companyData from "@/utils/companyData";

function DescriptionImage() {
  const { mobile, tablet, desktop } = companyData.images.description;

  const [imageData, setImageData] = useState({
    src: mobile,
  });

  const updateImageSrcAndDimensions = () => {
    if (window.innerWidth >= 1024) {
      setImageData({
        src: desktop,
      });
    } else if (window.innerWidth >= 768) {
      setImageData({
        src: tablet,
      });
    } else {
      setImageData({
        src: mobile,
      });
    }
  };

  useEffect(() => {
    // Update image source and dimensions based on window width when component is mounted
    updateImageSrcAndDimensions();

    // Add the event listener for window resizing
    window.addEventListener("resize", updateImageSrcAndDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateImageSrcAndDimensions);
    };
  }, []);

  return (
    <div className={styles.descriptionImageWrapper}>
      <Image
        src={imageData.src}
        alt="Best Gear"
        fill={true}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

export default DescriptionImage;
