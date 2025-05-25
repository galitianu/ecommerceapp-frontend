import "next-auth";

export type CompanyDetails = {
  companyName: string;
  address: string;
  contact: {
    email: string;
    phone: string;
  };
  metadataTitle: string;
  images: {
    logo: string;
    description: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    auth: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  heroHeading: string;
  heroText: string;
  descriptionHeading: string;
  description: string;
  copyright: string;
  footerText: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
  link: string;
};

export type IncludedItem = {
  id: string;
  quantity: number;
  item: string;
};

export type ImageGallery = {
  id: string;
  imageGallery1: string;
  imageGallery2: string;
  imageGallery3: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  baseImage: string;
  category: Category;
  recentlyAdded: boolean;
  featured: boolean;
  hero: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludedItem[];
  imageGallery: ImageGallery;
  disabled: boolean;
};

export type User = {
  id: string;
  username: string;
};

export interface Person {
  id: string;
  user: User;
  firstName: string;
  lastName: string;
}

export type Cart = {
  id: string;
  user: User;
};

export type CartItem = {
  product: Product;
  quantity: number;
  cart: Cart;
  id: string;
};

export enum PaymentOption {
  ON_DELIVERY = "ON_DELIVERY",
  ONLINE_PAYMENT = "ONLINE_PAYMENT",
}

export type BillingInformation = {
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentOption: PaymentOption;
};

export interface Order {
  id: string;
  person: Person;
  datePlaced: Date;
  total: number;
  billingInformation: BillingInformation | null;
  delivered: boolean;
  pending: boolean;
  stripeClientSecret: string;
  deliveryPerson: Person;
}

export type OrderItem = {
  id: string;
  product: Product;
  order: Order;
  quantity: number;
  price: number;
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
