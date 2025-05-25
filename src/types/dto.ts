export type CategoryDTO = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export type ProductDTO = {
  id: string;
  hero: boolean;
  slug: string;
  name: string;
  image: string;
  category: string;
  new: boolean;
  featured: boolean;
  price: number;
  description: string;
  features: string;
  imageGallery1: string;
  imageGallery2: string;
  imageGallery3: string;
  includes: {
    quantity: number;
    item: string;
  }[];
};
