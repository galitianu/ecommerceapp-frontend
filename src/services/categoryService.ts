import { Category } from "../types/entities";
import { api } from "@/api/api";

export const getCategories = async () => {
  const { data } = await api.get<Category[]>("/categories");
  return data.map(mapCategory);
};

export const mapCategory = (category: Category) => {
  return {
    id: category.id,
    name: category.name,
    image: category.image,
    slug: category.slug,
    link: `/category/${category.slug}`,
  };
};

export const getCategoryByProductId = async (
  productId: string
): Promise<Category | null> => {
  try {
    const response = await api.get<Category>(
      `/categories/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};
