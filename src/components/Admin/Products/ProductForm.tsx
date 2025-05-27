"use client";

import React, { useState, useEffect } from "react";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { ProductDTO } from "@/types/dto";
import styles from "@/components/Admin/EntityForm.module.css";
import toast from "react-hot-toast";
import InformationIcon from "@/components/common/InformationIcon/InformationIcon";

interface ProductFormProps {
  initialData: ProductDTO;
  onSubmit: (product: ProductDTO) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [product, setProduct] = useState<ProductDTO>(initialData);
  const [validUrlPaths, setValidUrlPaths] = useState<string[]>([]);
  const [newInclude, setNewInclude] = useState({ quantity: "", item: "" });

  useEffect(() => {
    setProduct(initialData);
    const envValidUrlPaths =
      process.env.NEXT_PUBLIC_VALID_URL_PATHS?.split(",") || [];
    setValidUrlPaths(envValidUrlPaths);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isChecked = (e.target as HTMLInputElement).checked;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? isChecked : value,
    }));
  };

  const handleIncludeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedIncludes = [...product.includes];
    updatedIncludes[index] = {
      ...updatedIncludes[index],
      [name]: value,
    };
    setProduct((prev) => ({
      ...prev,
      includes: updatedIncludes,
    }));
  };

  const addNewInclude = () => {
    setProduct((prev) => ({
      ...prev,
      includes: [
        ...prev.includes,
        { quantity: +newInclude.quantity, item: newInclude.item },
      ],
    }));
    setNewInclude({ quantity: "", item: "" });
  };

  const removeInclude = (index: number) => {
    const updatedIncludes = product.includes.filter((_, i) => i !== index);
    setProduct((prev) => ({
      ...prev,
      includes: updatedIncludes,
    }));
  };

  const isUrlValid = (url: string): boolean => {
    return validUrlPaths.some((path) => url.startsWith(path));
  };

  const isSlugValid = (slug: string): boolean => {
    const slugRegex = /^[a-z0-9+-]+(?:-[a-z0-9+-]+)*$/;
    return slugRegex.test(slug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSlugValid(product.slug)) {
      toast.error("Slug contains invalid characters.");
      return;
    }
    if (
      isUrlValid(product.image) &&
      isUrlValid(product.imageGallery1) &&
      isUrlValid(product.imageGallery2) &&
      isUrlValid(product.imageGallery3)
    ) {
      onSubmit(product);
    } else {
      toast.error("Please provide a valid image URL from accepted paths.");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Product Slug</label>
        <input
          type="text"
          name="slug"
          value={product.slug}
          onChange={handleChange}
          placeholder="Product Slug"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Product Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Product Image URL"
          required
        />
      </div>
      <div className={styles.formField}>
        <label style={{ marginRight: "1rem" }}>Price</label>
        <InformationIcon content="Changing the price will disable this product and create a new one." />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          onWheel={(e) => e.currentTarget.blur()}
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textArea}
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Features</label>
        <textarea
          name="features"
          value={product.features}
          onChange={handleChange}
          placeholder="Features"
          className={styles.textArea}
          required
        />
      </div>
      <div className={styles.formField}>
        <label>New</label>
        <input
          type="checkbox"
          name="new"
          checked={product.new}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>Hero</label>
        <input
          type="checkbox"
          name="hero"
          checked={product.hero}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={product.featured}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>Image Gallery 1</label>
        <input
          type="text"
          name="imageGallery1"
          value={product.imageGallery1}
          onChange={handleChange}
          placeholder="Image Gallery 1"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Image Gallery 2</label>
        <input
          type="text"
          name="imageGallery2"
          value={product.imageGallery2}
          onChange={handleChange}
          placeholder="Image Gallery 2"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Image Gallery 3</label>
        <input
          type="text"
          name="imageGallery3"
          value={product.imageGallery3}
          onChange={handleChange}
          placeholder="Image Gallery 3"
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <Button buttonType={ButtonType.PRIMARY} text="Save" />
        {onCancel && (
          <Button
            buttonType={ButtonType.TEXT}
            text="Cancel"
            onClick={onCancel}
          />
        )}
      </div>
    </form>
  );
};

export default ProductForm;
