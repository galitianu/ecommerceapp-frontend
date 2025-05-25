"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/Orders/Orders.module.css";
import Button, { ButtonType } from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import { ProductDTO } from "@/types/dto"; // Import the DTO type
import {
  addProduct,
  deleteProduct,
  enableProduct,
  getDisabledProducts,
  updateProduct,
} from "@/services/adminService";
import adminStyles from "@/components/Admin/AdminPanel.module.css";
import ProductForm from "@/components/Admin/Products/ProductForm";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/Admin/Products/ProductCard";
import EnableProductCard from "@/components/Admin/Products/EnableProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { mapProductToDTO } from "@/utils/mapProductToProductDTO";
import toast from "react-hot-toast";

function AdminPanelProducts() {
  const router = useRouter();
  const { isAdmin, loading } = useCheckAdmin();

  const { products, fetchProducts } = useProducts();
  const [disabledProducts, setDisabledProducts] = useState<ProductDTO[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const { data: session } = useSession();
  const [convertedProducts, setConvertedProducts] = useState<ProductDTO[]>([]);

  const fetchDisabledProducts = async (accessToken: string) => {
    const products = await getDisabledProducts(accessToken);
    const converted = await Promise.all(products.map(mapProductToDTO));
    setDisabledProducts(converted);
  };

  const convertProducts = async () => {
    const converted = await Promise.all(products.map(mapProductToDTO));
    setConvertedProducts(converted);
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchProducts();
      fetchDisabledProducts(session.accessToken);
    }
  }, [session, fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      convertProducts();
    }
  }, [products]);

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

  const handleAddProduct = async (product: ProductDTO) => {
    try {
      await addProduct(session.accessToken!, product);
      fetchProducts();
      setFormVisible(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    }
  };

  const handleUpdateProduct = async (product: ProductDTO) => {
    try {
      if (editingProduct) {
        await updateProduct(session.accessToken!, editingProduct.id, product);
        fetchProducts();
        setEditingProduct(null);
        setFormVisible(false);
        fetchDisabledProducts(session.accessToken!);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(session.accessToken!, id);
      fetchProducts();
      fetchDisabledProducts(session.accessToken!);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    }
  };

  const handleEnableProduct = async (productId: string) => {
    try {
      await enableProduct(session.accessToken!, productId);
      fetchDisabledProducts(session.accessToken!);
      fetchProducts();
      router.refresh();
    } catch (error) {
      console.error("Error enabling product:", error);
    }
  };

  const handleEditProduct = (product: ProductDTO) => {
    setEditingProduct(product);
    setFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormVisible(false);
  };

  const handleShowForm = () => {
    setEditingProduct(null);
    setFormVisible(true);
  };

  return (
    <div className={styles.ordersContainer}>
      <Button
        buttonType={ButtonType.TEXT}
        text="Go Back"
        onClick={() => router.back()}
      />
      <h1>Products Dashboard</h1>
      <h2 style={{ paddingTop: "4rem" }}>Add a new Product:</h2>
      <Button
        buttonType={ButtonType.PRIMARY}
        text="Add Product"
        onClick={handleShowForm}
      />
      {isFormVisible && !editingProduct && (
        <ProductForm
          initialData={{
            id: "",
            name: "",
            slug: "",
            category: "",
            image: "",
            price: 0,
            description: "",
            features: "",
            new: false,
            hero: false,
            featured: false,
            includes: [],
            imageGallery1: "",
            imageGallery2: "",
            imageGallery3: "",
          }}
          onSubmit={handleAddProduct}
          onCancel={handleCancelEdit}
        />
      )}
      <h2 style={{ paddingTop: "4rem" }}>Manage existing Products:</h2>
      {isFormVisible && editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      )}
      <div className={adminStyles.cards}>
        {convertedProducts.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
      <h2 style={{ paddingTop: "4rem" }}>Manage Disabled Products:</h2>
      <div className={adminStyles.cards}>
        {disabledProducts.map((product) => (
          <EnableProductCard
            key={product.id}
            product={product}
            onEnable={handleEnableProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPanelProducts;
