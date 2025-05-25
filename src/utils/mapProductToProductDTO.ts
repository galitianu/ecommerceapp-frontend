import { Product } from "@/types/entities";
import { ProductDTO } from "@/types/dto";
import { getCategoryByProductId } from "@/services/categoryService";

export const mapProductToDTO = async (
  product: Product
): Promise<ProductDTO> => {
  let categorySlug = product.category?.slug || "";
  if (!categorySlug && product.id) {
    const category = await getCategoryByProductId(product.id);
    categorySlug = category ? category.slug : "";
  }
  return {
    id: product.id,
    hero: product.hero,
    slug: product.slug,
    name: product.name,
    image: product.image,
    category: product.category?.slug || categorySlug,
    new: product.recentlyAdded,
    featured: product.featured,
    price: product.price,
    description: product.description,
    features: product.features,
    imageGallery1: product.imageGallery?.imageGallery1 ?? "",
    imageGallery2: product.imageGallery?.imageGallery2 ?? "",
    imageGallery3: product.imageGallery?.imageGallery3 ?? "",
    includes: product.includes.map((item) => ({
      quantity: item.quantity,
      item: item.item,
    })),
  };
};
