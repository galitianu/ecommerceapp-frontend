import { Product } from "../types/entities";
import { api } from "@/api/api";

export const getProductBySlug = async (slug: string) => {
  const { data } = await api.get<Product>("/products/slug/" + slug);
  return normalizeProductImagePaths(data);
};

export const getProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data.map(normalizeProductImagePaths);
};

export const getProductsRelated = async (slug: string, size: number) => {
  const { data } = await api.get<Product[]>(
    `/products/${slug}/recommendations`
  );
  return data.map(normalizeProductImagePaths);
};

export const getProductsByCategory = async (categorySlug: string) => {
  const { data } = await api.get<Product[]>(
    `/categories/${categorySlug}/products`
  );
  return data.map(normalizeProductImagePaths);
};

export const getProductHero = async () => {
  const { data } = await api.get<Product[]>("/products", {
    params: {
      hero: true,
    },
  });
  if (data && data.length > 0) {
    return normalizeProductImagePaths(data[0]);
  }

  return null;
};

export const getProductsFeatured = async () => {
  const { data } = await api.get<Product[]>("/products", {
    params: {
      featured: true,
    },
  });
  return data.map(normalizeProductImagePaths);
};

export const normalizeProductImagePaths = (product: Product): Product => {
  product.baseImage = product.image;
  return product;
};
