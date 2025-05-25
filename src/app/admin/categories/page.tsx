"use client";

import React, { useState, useEffect } from "react";
import styles from "@/components/Orders/Orders.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import { CategoryDTO } from "@/types/dto"; // Import the DTO type
import {
  addCategory,
  deleteCategory,
  enableCategory,
  getDisabledCategories,
  updateCategory,
} from "@/services/adminService";
import adminStyles from "@/components/Admin/AdminPanel.module.css";
import CategoryForm from "@/components/Admin/Categories/CategoryForm";
import { useSession } from "next-auth/react";
import { useCategories } from "@/contexts/CategoryContext";
import CategoryCard from "@/components/Admin/Categories/CategoryCard";
import EnableCategoryCard from "@/components/Admin/Categories/EnableCategoryCard";
import { Category } from "@/types/entities";

function AdminPanelCategories() {
  const router = useRouter();
  const { isAdmin, loading } = useCheckAdmin();
  const { categories, fetchCategories } = useCategories();
  const [disabledCategories, setDisabledCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<CategoryDTO | null>(
    null
  );
  const [isFormVisible, setFormVisible] = useState(false);
  const { data: session } = useSession();

  const fetchDisabledCategories = async (accessToken: string) => {
    const categories = await getDisabledCategories(accessToken);
    setDisabledCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
    if (session?.accessToken) {
      fetchCategories();
      fetchDisabledCategories(session.accessToken);
    }
  }, [fetchCategories, session]);

  if (loading) {
    return (
      <div className={styles.ordersContainer}>
        <Button
          buttonType={ButtonType.TEXT}
          text="Go Back"
          onClick={() => router.back()}
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAdmin || !session?.accessToken) {
    return (
      <div className={styles.ordersContainer}>
        <Button
          buttonType={ButtonType.TEXT}
          text="Go Back"
          onClick={() => router.back()}
        />
        <h1>You do not have access to this page</h1>
      </div>
    );
  }

  const handleAddCategory = async (category: CategoryDTO) => {
    try {
      await addCategory(session.accessToken!, category);
      fetchCategories();
      setFormVisible(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (category: CategoryDTO) => {
    try {
      if (editingCategory) {
        await updateCategory(
          session.accessToken!,
          editingCategory.id,
          category
        );
        fetchCategories();
        setEditingCategory(null);
        setFormVisible(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(session.accessToken!, id);
      fetchCategories();
      fetchDisabledCategories(session.accessToken!);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEnableCategory = async (categoryId: string) => {
    try {
      await enableCategory(session.accessToken!, categoryId);
      fetchDisabledCategories(session.accessToken!);
      fetchCategories();
    } catch (error) {
      console.error("Error enabling category:", error);
    }
  };

  const handleEditCategory = (category: CategoryDTO) => {
    setEditingCategory(category);
    setFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setFormVisible(false);
  };

  const handleShowForm = () => {
    setEditingCategory(null);
    setFormVisible(true);
  };

  return (
    <div className={styles.ordersContainer}>
      <Button
        buttonType={ButtonType.TEXT}
        text="Go Back"
        onClick={() => router.back()}
      />
      <h1>Categories Dashboard</h1>
      <h2
        style={{
          paddingTop: "4rem",
        }}
      >
        Add a new Category:
      </h2>
      <Button
        buttonType={ButtonType.PRIMARY}
        text="Add Category"
        onClick={handleShowForm}
      />
      {isFormVisible && !editingCategory && (
        <CategoryForm
          initialData={{ id: "", name: "", image: "", slug: "" }}
          onSubmit={handleAddCategory}
          onCancel={handleCancelEdit}
        />
      )}
      <h2
        style={{
          paddingTop: "4rem",
        }}
      >
        Manage existing Categories:
      </h2>
      {isFormVisible && editingCategory && (
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleUpdateCategory}
          onCancel={handleCancelEdit}
        />
      )}
      <div className={adminStyles.cards}>
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>
      <h2
        style={{
          paddingTop: "4rem",
        }}
      >
        Manage Disabled Categories:
      </h2>
      <div className={adminStyles.cards}>
        {disabledCategories.map((category) => (
          <EnableCategoryCard
            key={category.id}
            category={category}
            onEnable={handleEnableCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPanelCategories;
