import React, { useState, useEffect } from "react";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { CategoryDTO } from "@/types/dto";
import styles from "@/components/Admin/EntityForm.module.css";
import toast from "react-hot-toast";

interface CategoryFormProps {
  initialData: CategoryDTO;
  onSubmit: (category: CategoryDTO) => void;
  onCancel?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [category, setCategory] = useState<CategoryDTO>(initialData);
  const [validUrlPaths, setValidUrlPaths] = useState<string[]>([]);

  useEffect(() => {
    setCategory(initialData);
    const envValidUrlPaths =
      process.env.NEXT_PUBLIC_VALID_URL_PATHS?.split(",") || [];
    setValidUrlPaths(envValidUrlPaths);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isUrlValid = (url: string): boolean => {
    // Check if the provided URL starts with any of the valid paths
    return validUrlPaths.some((path) => url.startsWith(path));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUrlValid(category.image)) {
      onSubmit(category);
    } else {
      toast.error("Please provide a valid image URL from accepted paths.");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label>Category Name</label>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Category Image URL</label>
        <input
          type="text"
          name="image"
          value={category.image}
          onChange={handleChange}
          placeholder="Category Image URL"
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Category Slug</label>
        <input
          type="text"
          name="slug"
          value={category.slug}
          onChange={handleChange}
          placeholder="Category Slug"
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

export default CategoryForm;
