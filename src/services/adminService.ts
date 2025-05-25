import { api } from "@/api/api";
import { CategoryDTO, ProductDTO } from "@/types/dto";
import { Category, Product } from "@/types/entities";
import { mapCategory } from "./categoryService";
import { normalizeProductImagePaths } from "./productService";

export const checkAdminStatus = async (
  accessToken: string,
  userId: string
): Promise<boolean> => {
  try {
    const url = `users/${userId}/isAdmin`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while checking admin status:", error);
    throw error;
  }
};

export const addCategory = async (
  accessToken: string,
  category: CategoryDTO
) => {
  try {
    const response = await api.post("/categories", category, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while adding category:", error);
    throw error;
  }
};

export const deleteCategory = async (accessToken: string, id: string) => {
  try {
    const url = `categories/${id}`;

    await api.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error while deleting category:", error);
    throw error;
  }
};

export const updateCategory = async (
  accessToken: string,
  id: string,
  category: CategoryDTO
) => {
  try {
    const response = await api.patch(`/categories/${id}`, category, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while updating category:", error);
    throw error;
  }
};

export const getDisabledCategories = async (
  accessToken: string
): Promise<Category[]> => {
  const url = `/categories/disabled`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const { data } = await api.get<Category[]>(url, { headers });
    return data.map(mapCategory);
  } catch (error) {
    console.error("Error fetching disabled categories:", error);
    return [];
  }
};

export const enableCategory = async (
  accessToken: string,
  categoryId: string
): Promise<Category | null> => {
  const url = `/categories/enable/${categoryId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await api.patch<Category>(url, null, { headers });
    return result.data;
  } catch (error) {
    console.error("Error enabling category:", error);
    return null;
  }
};

export const addProduct = async (
  accessToken: string,
  product: ProductDTO
): Promise<Product> => {
  try {
    const response = await api.post("/products", product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while adding product:", error);
    throw error;
  }
};

export const deleteProduct = async (
  accessToken: string,
  id: string
): Promise<void> => {
  try {
    const url = `products/${id}`;

    await api.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error while deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (
  accessToken: string,
  id: string,
  product: ProductDTO
) => {
  try {
    const response = await api.patch(`/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while updating product:", error);
    throw error;
  }
};

export const getDisabledProducts = async (
  accessToken: string
): Promise<Product[]> => {
  const url = `/products/disabled`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const { data } = await api.get<Product[]>(url, { headers });
    return data.map(normalizeProductImagePaths);
  } catch (error) {
    console.error("Error fetching disabled products:", error);
    return [];
  }
};

export const enableProduct = async (
  accessToken: string,
  productId: string
): Promise<Product | null> => {
  const url = `/products/enable/${productId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await api.patch<Product>(url, null, { headers });
    return result.data;
  } catch (error) {
    console.error("Error enabling product:", error);
    return null;
  }
};
